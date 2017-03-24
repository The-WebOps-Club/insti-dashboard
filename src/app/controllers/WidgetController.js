(function(){

  angular
    .module('app')
    .controller('WidgetCtrl', [
      '$scope',
      '$timeout',
      WidgetController

    ])
  .directive('randomBgColor', function () {
  return {
    link: function (scope, element) {
      var r = Math.floor(Math.random() * 60) + 130,
          g = Math.floor(Math.random() * 60) + 130,
          b = Math.floor(Math.random() * 60) + 130;
      var bgColor = 'rgb(' + r + ',' + g + ',' + b + ')';
      element.css('background-color', bgColor);
    }
  };
})
.directive('youtube', function () {
  return {
    scope: { id: '@' },
    template: '<iframe frameborder="0" height="100%" width="100%" src="{{src}}"></iframe>',
    link: function (scope) {
      scope.src = 'https://youtube.com/embed/' + scope.id + '?autoplay=0&controls=1&showinfo=0&autohide=1';
    }
  }
})
.config(function($sceDelegateProvider) {
  $sceDelegateProvider.resourceUrlWhitelist([
    'self', 'https://youtube.com/**'
  ]);
});


  function WidgetController($scope, $timeout) {
    var vm = this;

  vm.columns = 90;
  vm.rows = 60;

  vm.editable = false;
  vm.additionPossible = true;

  vm.options = {
    showGrid: false,
    highlightNextPosition: false
  };

  vm.greetingWidgets = [{
    position: { top: 2, height: 40, left: 4, width: 26 },
    text: 'Hi!'
  },{
    position: { top: 2, height: 40, left: 32, width: 26 },
    text: 'Hello!'
  },{
    position: { top: 2, height: 40, left: 60, width: 26},
    text: 'Servus!'
  }];

  vm.addWidget = addWidget;
  vm.removeWidget = removeWidget;
  vm.toggleEditable = toggleEditable;

  updateGridSize();
  window.onresize = updateGridSize;

  $scope.$on('wg-grid-full', function () {
    vm.additionPossible = false;
  });

  $scope.$on('wg-grid-space-available', function () {
    vm.additionPossible = true;
  });

  $scope.$on('wg-update-position', function (event, widgetInfo) {
    console.log('A widget has changed its position!', widgetInfo);
  });

  var greetings = ['Hola!', 'Hey!', 'Bonjour!', 'Servus!', 'Hello!'];
  function addWidget() {
    if (vm.additionPossible) {
      var greeting = greetings[Math.floor(Math.random() * greetings.length)];
      var widget = {
        position: null,
        text: greeting
      };
      vm.greetingWidgets.push(widget);
    }
  }

  function removeWidget(widget) {
    var idx = vm.greetingWidgets.indexOf(widget);
    if (idx > -1) {
      vm.greetingWidgets.splice(idx, 1);
    }
  }

  function toggleEditable() {
    vm.editable = !vm.editable;
    vm.options.showGrid = vm.editable;
  }

  function updateGridSize() {
    $timeout(function () {
      var grid = document.getElementById('demo-grid');
      vm.gridWidth = grid.clientWidth;
      vm.gridHeight = grid.clientHeight;
    });
  }
}
})();
