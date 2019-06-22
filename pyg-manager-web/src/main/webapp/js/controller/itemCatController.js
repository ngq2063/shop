 //控制层 
app.controller('itemCatController' ,function($scope,$controller   ,itemCatService){	
	
	$controller('baseController',{$scope:$scope});//继承
	
    //读取列表数据绑定到表单中  
	$scope.findAll=function(){
		itemCatService.findAll().success(
			function(response){
				$scope.list=response;
			}			
		);
	}    
	
	//分页
	$scope.findPage=function(page,rows){			
		itemCatService.findPage(page,rows).success(
			function(response){
				$scope.list=response.rows;	
				$scope.paginationConf.totalItems=response.total;//更新总记录数
			}			
		);
	}
	
	//查询实体 
	$scope.findOne=function(id){				
		itemCatService.findOne(id).success(
			function(response){
				$scope.entity= response;					
			}
		);				
	}
	
	//保存 
	$scope.save=function(){				
		var serviceObject;//服务层对象  				
		if($scope.entity.id!=null){//如果有ID
			serviceObject=itemCatService.update( $scope.entity ); //修改  
		}else{
			
			//给保存对象赋值
			$scope.entity.parentId = $scope.parentId;
			serviceObject=itemCatService.add( $scope.entity  );//增加 
		}				
		serviceObject.success(
			function(response){
				if(response.success){
					//重新查询 
		        	$scope.findItemCatByParentId($scope.parentId);
				}else{
					alert(response.message);
				}
			}		
		);				
	}
	
	 
	//批量删除 
	$scope.dele=function(){			
		//获取选中的复选框			
		itemCatService.dele( $scope.selectIds ).success(
			function(response){
				if(response.success){
					$scope.reloadList();//刷新列表
					$scope.selectIds=[];
				}						
			}		
		);				
	}
	
	$scope.searchEntity={};//定义搜索对象 
	
	//搜索
	$scope.search=function(page,rows){			
		itemCatService.search(page,rows,$scope.searchEntity).success(
			function(response){
				$scope.list=response.rows;	
				$scope.paginationConf.totalItems=response.total;//更新总记录数
			}			
		);
	}
	
	//定义父节点id变量,记录父节点值
	$scope.parentId = 0;
	
	//根据父id进行查询
	$scope.findItemCatByParentId=function(parentId){
		$scope.parentId = parentId;
		itemCatService.findItemCatByParentId(parentId).success(function(data){
			$scope.list=data;
		})
	}
	
	//定义标识,确定为几级菜单
	$scope.grade=1;
	
	//每当点击下级详情，进行更新标识
	$scope.setGrade=function(newgrade){
		$scope.grade=newgrade;
	}
	// 根据父id查询子节点,记录每一级节点对象
	$scope.selectCatList=function(p_entity){
		// 如果是第一级菜单
		if ($scope.grade == 1) {

			$scope.entity_1 = null;
			$scope.entity_2 = null;
		}

		// 如果是第二级菜单
		if ($scope.grade == 2) {
			$scope.entity_1 = p_entity;
			$scope.entity_2 = null;
		}
		
		// 如果是第三级菜单
		if ($scope.grade == 3) {
			$scope.entity_2 = p_entity;
		};
		
		//调用查询下级方法
		$scope.findItemCatByParentId(p_entity.id);
	}
    
});	
