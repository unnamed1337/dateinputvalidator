var FullFeatureDateInput;

(function () {
  var validClass="valid";
  var invalidClass="invalid";
  var allowedKeys=["ArrowLeft","ArrowRight","F1","F2","F3","F4","F5","F6","F7","F8","F9","F10","F11","F12","Delete","Backspace"];
  var allowedChars=["1","2","3","4","5","6","7","8","9","0","."];
  var replaceYear = false;
  var isValid=false;
  function Init(data){
    if(data!==undefined){
      if(data.invalidClass!==undefined){
        invalidClass = data.invalidClass;
      }
      if(data.validClass!==undefined){
        validClass = data.validClass;
      }
      if(data.replaceYear!==undefined){
        replaceYear = data.replaceYear;
      }
    }
    $('input[data-dateinput="true"]').on("keydown",function(e){
      return react(this,e);
    });
    $('input[data-dateinput="true"]').on("keyup",function(e){
      doValidation(this,e);
    });

    if(data.additionalSelector!==undefined){
      $(data.additionalSelector).on("keydown",function(e){
        return react(this,e);
      });
      $(data.additionalSelector).on("keyup",function(e){
        doValidation(this,e);
      });
    }
  }
  
  function doValidation(element,e){
    if($.inArray(e.originalEvent.key,allowedChars)>=0){      
      isValid=validate(element);
    }
    doValidationOutput(element);
  }
  
  function doValidationOutput(element){
    if(isValid){
      $(element).removeClass(invalidClass);
      $(element).addClass(validClass);
    }
    else{
      $(element).removeClass(validClass);
      $(element).addClass(invalidClass);
    }
    $(element).data("valid-date",isValid);
  }
  
  function react(element,e){
    if($.inArray(e.originalEvent.key,allowedChars)>=0){      
//      validate(element);
      return true;
    }
    else if($.inArray(e.originalEvent.key,allowedKeys)>=0){
      return true;
    }
    else{
      console.log(e.originalEvent.key);
      return false;
    }
  }
  
  function validate(element){
    
    var isValid = false;
    var dateString =element.value;
    var date = dateString.split(".");
    if(date.length == 3){
      if(date[0].length==1){
        date[0] = "0"+date[0];
      }
      if(date[1].length==1){
        date[1] = "0"+date[1];
      }
      if(date[2].length == 2 && replaceYear){
        if(date[2]>50){
          date[2]= "19"+date[2];
        }
        else{
          date[2]= "20"+date[2];
        }
      }
      dateString = date[0]+"."+date[1]+"."+date[2];
      isValid = (date[0]<=31 && date[0]>0) && (date[1]<= 12 && date[1]>0) && (date[2].length == 2 || date[2].length == 4);
    }
    else if(dateString.length>2 && date.length < 3){
      if(date[0].length==1){
        dateString = "0"+dateString;
      }
      if(dateString[2] == "."){
        isValid = true;
      }
      else{
        var newString="";
        for(var i = 0; i<dateString.length;i++){
          if(i == 2){
            newString+=".";
          }
          newString += dateString[i];
        }
        dateString = newString;
      }
      if(dateString.length>5){
        if(dateString[5] == "."){
          
        }
        else{
          var newString="";
          for(var i = 0; i<dateString.length;i++){
            if(i == 5){
              newString+=".";
            }
            newString += dateString[i];
          }
          dateString = newString;
        }
        date = dateString.split(".");
        isValid = (date[0]<=31 && date[0]>0) && (date[1]<= 12 && date[1]>0) && (date[2].length == 2 || date[2].length == 4);
      }
    }
    element.value = dateString;
    return isValid;
  }

  
  FullFeatureDateInput.Init = Init;
}(FullFeatureDateInput || (FullFeatureDateInput = {})));