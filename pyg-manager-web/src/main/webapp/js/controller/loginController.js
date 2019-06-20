app.controller("loginController",function($scope,loginService){
	
	$scope.findLoginName=function(){
		loginService.findLoginName().success(function(data){
			$scope.loginName=data.loginName;
		})
	}
})

