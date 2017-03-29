(function() {
  
  angular
    .module('HRMS')
    .controller('EmployeeDetailsController', EmployeeDetailsController);
  EmployeeDetailsController.$inject = ['$http','$scope','$mdPanel','$mdDateLocale','SharedService'];
  function EmployeeDetailsController($http,$scope,$mdPanel,$mdDateLocale,SharedService) {
  	debugger;
  	var xyz=SharedService;
    $scope.initial='';
  	var ip="http://192.168.100.12:1337/users/";
  	$scope.selectedItem = null;
    $scope.searchText = null;
    $scope.querySearch = querySearch;
     $scope.techskills = loadTechSkills();
     $scope.selectedSkills = [];
      $scope.numberChips = [];
    $scope.numberChips2 = [];
    $scope.numberBuffer = '';
    $scope.autocompleteDemoRequireMatch = false;
     $scope.transformChip = transformChip;

  var req = {
method: 'GET',
url: ip+ 'getProfile/'+xyz.useremail,
headers: {
 'Content-Type': 'application/json; charset=UTF-8'

},
data: {}
}
debugger;
var req1={
method: 'GET',
url: ip+ 'getSupervisors',
headers: {
 'Content-Type': 'application/json; charset=UTF-8'

},
data: {}
}

$http(req1).success(function(data) {

 debugger;
 $scope.reportingManagers=data;
 
});
$http(req).success(function(data) {

 debugger;
 $scope.employeeinfo=data;
 if(data[0])
 {
  var unique = data[0].skill_set.filter(function(elem, index, self) {
    return index == self.indexOf(elem);
});
  if(unique.length>0)
  {
    var newarr=[];
  for(var i=0;i<unique.length;i++){newarr.push({'name':unique[i]});}
  }
  

 $scope._id=data[0]._id;
 $scope.initial=data[0].name.replace(/[^A-Z]/g, '');
  $scope.fname=data[0].first_name;
   $scope.lname=data[0].last_name;
   $scope.email=data[0].email;
   $scope.job_title=data[0].job_title;
    $scope.joining_date=moment(data[0].joining_date).format('DD-MM-YYYY');
    $scope.reporting_to=data[0].reporting_to?data[0].reporting_to:'NA';
    $scope.employee_type=data[0].employee_type?data[0].employee_type:'NA';
    $scope.employee_status=data[0].employee_status?data[0].employee_status:'NA';
    $scope.selectedSkills=newarr?newarr:[];
    if(data[0].personal_info)
    {
    $scope.dob=data[0].personal_info.dob?new Date(data[0].personal_info.dob):null;
    $scope.marital_s=data[0].personal_info.marital_status?data[0].personal_info.marital_status:null;
    $scope.mobile=data[0].personal_info.mobile?Number(data[0].personal_info.mobile):'';
    $scope.phone=data[0].personal_info.landline?Number(data[0].personal_info.landline):'';
    $scope.gender=data[0].personal_info.gender?data[0].personal_info.gender:'';
    $scope.address=data[0].personal_info.address?data[0].personal_info.address:'';
    $scope.city=data[0].personal_info.city?data[0].personal_info.city:'';
     $scope.state=data[0].personal_info.state?data[0].personal_info.state:'';
     $scope.postal_code=data[0].personal_info.postal_code?Number(data[0].personal_info.postal_code):'';
     $scope.country=data[0].personal_info.country?data[0].personal_info.country:'';
     }
     if(data[0].emergency_info)
     {
     $scope.emergency_fname=data[0].emergency_info.first_name?data[0].emergency_info.first_name:'';
     $scope.emergency_lname=data[0].emergency_info.last_name?data[0].emergency_info.last_name:'';
      $scope.emergency_relation=data[0].emergency_info.relationship?data[0].emergency_info.relationship:'';
       $scope.emergency_mbno=data[0].emergency_info.contact?data[0].emergency_info.contact:'';
       }
       if(data[0].bank_info)
       {
        $scope.bank_name=data[0].bank_info.account_number?data[0].bank_info.account_number:'';
         $scope.acc_type=data[0].bank_info.account_type?data[0].bank_info.account_type:'';
          $scope.acc_number=data[0].bank_info.account_number?data[0].bank_info.account_number:'';
           $scope.ifsc_code=data[0].bank_info.IFSC?data[0].bank_info.IFSC:'';
           }
 }
});

 /*$scope.splitfun1=function(val)
  {
  	debugger;
  	if(val)
  	{
  	return (val.replace(/[^A-Z]/g, ''));
  }
    //return (val1.charAt(0)+val2.charAt(0));
  }*/

   $scope.trix = '';
    var events = ['trixInitialize', 'trixChange', 'trixSelectionChange', 'trixFocus', 'trixBlur', 'trixFileAccept', 'trixAttachmentAdd', 'trixAttachmentRemove'];
 
 
  for (var i = 0; i < events.length; i++) {
        $scope[events[i]] = function(e) {
            console.info('Event type:', e.type);
        }
    };

     $scope.trixAttachmentAdd = function(e) {
        var attachment;
        attachment = e.attachment;
        if (attachment.file) {
            return uploadAttachment(attachment);
        }
    }
 
 host = "https://d13txem1unpe48.cloudfront.net/";

    uploadAttachment = function(attachment) {
        var file, form, key, xhr;
        file = attachment.file;
        key = createStorageKey(file);
        form = new FormData;
        form.append("key", key);
        form.append("Content-Type", file.type);
        form.append("file", file);
        xhr = new XMLHttpRequest;
        xhr.open("POST", host, true);
        xhr.upload.onprogress = function(event) {
            var progress;
            progress = event.loaded / event.total * 100;
            return attachment.setUploadProgress(progress);
        };
        xhr.onload = function() {
            var href, url;
            if (xhr.status === 204) {
                url = href = host + key;
                return attachment.setAttributes({
                    url: url,
                    href: href
                });
            }
        };
        return xhr.send(form);
    };

createStorageKey = function(file) {
        var date, day, time;
        date = new Date();
        day = date.toISOString().slice(0, 10);
        time = date.getTime();
        return "tmp/" + day + "/" + time + "-" + file.name;
    };

 function querySearch (query) {
      var results = query ? $scope.techskills.filter(createFilterFor(query)) : [];
      return results;
    }

    /**
     * Create filter function for a query string
     */
    function createFilterFor(query) {
      var lowercaseQuery = angular.lowercase(query);

      return function filterFn(skills) {
        return (skills._lowername.indexOf(lowercaseQuery) === 0) /*||
            (skills._lowertype.indexOf(lowercaseQuery) === 0)*/;
      };

    }

    function loadTechSkills() {
      var teskills = [
        {
          'name': 'HTML'
          
        },
        {
          'name': 'CSS'
          
        }, {
          'name': 'JQUERY'
          
        },
        {
          'name': 'JAVASCRIPT'
         
        },{
          'name': 'ANGULAR'
         
        },
        {
          'name': 'SQL'
         
        },
        {
          'name': 'PHP'
         
        },
        {
          'name': 'BOOTSTRAP'
         
        }
      ];

      return teskills.map(function (skill) {
        skill._lowername = skill.name.toLowerCase();
       // skill._lowertype = skill.type.toLowerCase();
        return skill;
      });
    }
 function transformChip(chip) {
      // If it is an object, it's already a known chip
      if (angular.isObject(chip)) {
        return chip;
      }

      // Otherwise, create a new one
      return { name: chip }
    }

$scope.saveProfile=function()
{
  debugger;
var skllArray = $scope.selectedSkills.map( function( el ){ 
                                return el.name; 
                               });
if($scope.dob)
{
var dob=$scope.dob.toISOString();
}
else
{
  dob=null;
}
 /*first_name;
  last_name;email;employee_status;job_title;joining_date;projects;reporting_to;skill_set;*/
  var reqprofile = {
method: 'POST',
url: ip+ 'updateProfile',
headers: {
 'Content-Type': 'application/json; charset=UTF-8'

},
data: {'email':$scope.email,'first_name':$scope.fname,'last_name':$scope.lname,'job_title':$scope.job_title,'employee_type':$scope.employee_type,'employee_status':$scope.employee_status,'reporting_to':$scope.reporting_to,'skill_set':skllArray,'personal_info':{'dob':dob,'marital_status':$scope.marital_s,'mobile':$scope.mobile,'landline':$scope.phone,'address':$scope.address,'gender':$scope.gender,'state':$scope.state,'city':$scope.city,'postal_code':$scope.postal_code,'country':$scope.country},'emergency_info':{'first_name':$scope.emergency_fname,'last_name':$scope.emergency_lname,'relationship':$scope.emergency_relation,'contact':$scope.emergency_mbno},'bank_info':{'bank_name':$scope.bank_name,'account_number':$scope.acc_number,'account_type':$scope.acc_type,'IFSC':$scope.ifsc_code}}
}
debugger;
$http(reqprofile).success(function(data) {

 debugger;
 alert("done");
 
 
})
.error(function(data, status, headers, config) {
    alert("not done");
    
});

}

 $scope.events = [{
    badgeClass: 'info',
    badgeIconClass: 'glyphicon-check',
    title: 'First heading',
    content: 'Some awesome content.'
  }, {
    badgeClass: 'warning',
    badgeIconClass: 'glyphicon-credit-card',
    title: 'Second heading',
    content: 'More awesome content.'
  }];

$scope.clickEvent=function()
{
  alert("yes");
}
 }




 })();
  
  	