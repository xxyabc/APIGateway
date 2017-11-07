var apiGatewayCtrls = angular.module('apiGatewayCtrls', ['ionic']);

apiGatewayCtrls.controller('StartCtrl', ['$scope','$http',
    function($scope,$http) {

        $scope.file = '文件';
        $scope.debug = '调试';
        $scope.tools = '工具';
        $scope.window = '窗口';
        $scope.help = '帮助';
        $scope.APIproperty = 'API属性';
        $scope.XMLfile = 'XML文件';
        $scope.YAMLfile = 'YAML文件';
        $scope.property = '属性';
        $scope.ID = 'ID';
        $scope.name = '名称';
        $scope.type = '类型';
        $scope.in = '输入';
        $scope.out = '输出';
        $scope.URL = 'URL';
        $scope.information = '调试信息';
        $scope.debug1 = '注册';
        $scope.debug2 = '调试';
        $scope.debug3 = '生成XML';
        $scope.debug4 = 'XML文件导出';
        $scope.debug5 = '转YAML';
        $scope.debug6 = 'YAML文件导出';
        $scope.items =['1','2','3'];
        $scope.toolss =[
         {title:"工具1"},
         {title:"工具2"},
         {title:"工具3"}
        ];
        $scope.filess =[
         {title:"文件1"},
         {title:"文件2"},
         {title:"文件3"}
        ];
        $scope.newxml = function(){//生成xml
            var xml = Blockly.Xml.workspaceToDom(workspace);
            var xml_text = Blockly.Xml.domToText(xml);
            //alert(xml_text);
            $scope.xml = xml_text;
        };

        $scope.newfile = function(){//导出yaml
            var txtdata = $scope.yaml;
            //alert(txtdata);
            var content = ""+txtdata;
            var blob = new Blob([content], {type: "text/plain;charset=utf-8"});
            saveAs(blob, "file.yaml");//saveAs(blob,filename) //仅限于chorme的下载目录里
        };

        $scope.newyaml = function(data){
                $scope.yaml=data;
        };

    }
]).controller('PopupCtrl',function($scope,$http, $ionicPopup, $timeout) {

         // Triggered on a button click, or some other target
         $scope.showPopup = function() {
           $scope.data = {}
           var myPopup = $ionicPopup.show({
             template: '<input type="text" ng-model="data.wifi">',
             title: 'API注册',
             subTitle: '请输入注册API名称',
             scope: $scope,
             buttons: [
               { text: '取消' },
               {
                 text: '<b>注册</b>',
                 type: 'button-positive',
                 onTap: function(e) {
                   if (!$scope.data.wifi) {
                     // 不允许用户关闭，除非输入 wifi 密码
                     e.preventDefault();
                   } else {
                    //alert($scope.data.wifi);
                    //生成xml
                     var xml = Blockly.Xml.workspaceToDom(workspace);
                     var xml_text = Blockly.Xml.domToText(xml);
                     //alert(xml_text);
                     //xml+apiname后送至后台
                     $http({  
                         method  : 'post',  
                         url     : 'http://www.linyimin.club:8001/combination/getFlowXML',  
                         params    :{"fileContent":xml_text,"serviceName":$scope.data.wifi},  // 传递数据作为字符串，从前台传到后台  
                     }).success(function(data,status,headers,config) {//这里的data，就是后台传递过来的数据jsonArray  
                        // alert("yes!!!");
                        alert("注册成功！");
                        $scope.newyaml(data);
                     }).error(function(data,status,headers,config){  
                          alert("错误");  
                     }); 
                   }
                 }
               },
             ]
           });
           // myPopup.then(function(res) {
           //   console.log('Tapped!', res);
           // });
           // $timeout(function() {
           //    myPopup.close(); // 3秒后关闭弹窗
           // }, 3000);
          };
        });

apiGatewayCtrls.controller('HelloCtrl', ['$scope',
    function($scope) {
        $scope.greeting = {
            text: 'Hello'
        };
    }
]);
// apiGatewayCtrls.controller('BookListCtrl', ['$scope',
//     function($scope) {
//         $scope.books =[
//         	{title:"《Ext江湖》",author:"大漠穷秋"},
//         	{title:"《ActionScript游戏设计基础（第二版）》",author:"大漠穷秋"},
//         	{title:"《用AngularJS开发下一代WEB应用》",author:"大漠穷秋"}
//         ]
//     }
// ]);

/**
 * 这里接着往下写，如果控制器的数量非常多，需要分给多个开发者，可以借助于grunt来合并代码
 */
