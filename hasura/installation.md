# Install docker 1.12.5
apt -y install apt-transport-https ca-certificates
apt-key adv --keyserver hkp://p80.pool.sks-keyservers.net:80 --recv-keys 58118E89F3A912897C070ADBF76221572C52609D
echo "deb https://apt.dockerproject.org/repo ubuntu-xenial experimental" > /etc/apt/sources.list.d/docker.list
apt update
apt purge lxc-docker
apt-cache policy docker-engine
apt -y install linux-image-extra-$(uname -r)
apt-get install docker-engine=1.12.5-0~ubuntu-xenial

# Install kubectl

# Install Kubernetes 1.7.0
curl -s https://packages.cloud.google.com/apt/doc/apt-key.gpg | apt-key add -
cat <<EOF >/etc/apt/sources.list.d/kubernetes.list
deb http://apt.kubernetes.io/ kubernetes-xenial main
EOF
apt-get update
apt-get install -y kubelet kubeadm

# Start Kubernetes
kubeadm init

# Run as regular user
mkdir -p $HOME/.kube
sudo cp -i /etc/kubernetes/admin.conf $HOME/.kube/config
sudo chown $(id -u):$(id -g) $HOME/.kube/config

kubectl taint nodes --all node-role.kubernetes.io/master-

# Create pod network either Flannel or Calico 
# Flannel
kubectl create -f https://raw.githubusercontent.com/coreos/flannel/master/Documentation/kube-flannel-rbac.yml
kubectl create --namespace kube-system -f https://raw.githubusercontent.com/coreos/flannel/master/Documentation/kube-flannel.yml

# Calico
kubectl apply -f http://docs.projectcalico.org/v2.3/getting-started/kubernetes/installation/hosted/kubeadm/1.7/calico.yaml

# Create k8s hasura components
kubectl create -f project-secrets.yaml
kubectl create -f project-conf.yaml
kubectl create ns hasura
kubectl create -f cluster-role-binding.yaml
kubectl create -f controller-configmap.yaml
kubectl create -f platform-init.yaml
kubectl create -f platform-sync.yaml

