/**
 * @file src/app/pages/profile/ProfilePageCtrl.js
 * @author Shahidh K Muhammed <shahidhkmuhammed@gmail.com>
 * Date: 20.06.2017
 * Last Modified: 20.06.2017
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.profile')
    .controller('ProfilePageCtrl', ProfilePageCtrl);

  /** @ngInject */
  function ProfilePageCtrl($scope, fileReader, $filter, $uibModal, api, toastr) {

    $scope.profile = api.profile;

    $scope.picture = $filter('appImage')('theme/no-photo.png');

    $scope.removePicture = function () {
      $scope.picture = $filter('appImage')('theme/no-photo.png');
      $scope.noPicture = true;
    };

    $scope.uploadPicture = function () {
      var fileInput = document.getElementById('uploadFile');
      fileInput.click();
    };

    $scope.socialProfiles = [
      {
        name: 'Facebook',
        icon: 'socicon-facebook'
      },
      {
        name: 'Twitter',
        icon: 'socicon-twitter'
      },
      {
        name: 'Google',
        icon: 'socicon-google'
      },
      {
        name: 'LinkedIn',
        icon: 'socicon-linkedin'
      },
      {
        name: 'GitHub',
        icon: 'socicon-github'
      },
      {
        name: 'StackOverflow',
        icon: 'socicon-stackoverflow'
      },
      {
        name: 'Dribbble',
        icon: 'socicon-dribble'
      },
      {
        name: 'Behance',
        icon: 'socicon-behace'
      }
    ];

    $scope.unconnect = function (item) {
      item.href = undefined;
    };

    $scope.showModal = function (item) {
      $uibModal.open({
        animation: false,
        controller: 'ProfileModalCtrl',
        templateUrl: 'app/pages/profile/profileModal.html'
      }).result.then(function (link) {
          item.href = link;
        });
    };

    $scope.getFile = function () {
      fileReader.readAsDataUrl($scope.file, $scope)
          .then(function (result) {
            $scope.picture = result;
          });
    };

    $scope.switches = [true, true, false, true, true, false];

    console.log('aaa');

    $scope.updateProfile = function () {
      var profile = JSON.parse(JSON.stringify($scope.profile));
      delete profile.id;
      delete profile.iitm_id;
      delete profile.username;
      api.query('update', {
        table: 'user',
        where: {id: api.user.hasura_id},
        $set: profile,
        returning: ['id', 'iitm_id', 'username', 'full_name', 'email', 'mobile']
      }).then(function(data){
        console.log(data);
        api.profile = data.returning[0];
        $scope.profile = api.profile;
        toastr.success('Profile updated!', 'Done')
      }).catch(function(error){
        toastr.error('error', 'Error')
        console.log(error);
      });
    };
  }

})();
