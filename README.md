# Dateinput Validator

Date Validator for Text - ```<input/>``` Elements


## Usage

### Simple usage with default values:
```javascript
FullFeatureDateInput.Init();
```
This will effect all input elements with attribute data-dateinput="true" set, like:
```
<input type="text" data-dateinput="true"/>
```


### Usage with all params set:
```javascript
FullFeatureDateInput.Init({
  invalidClass:"is-invalid",
  validClass:"is-valid",
  replaceYear:true,
  additionalSelector:".myinputs"
});
```
This will effect all input elements with attribute data-dateinput="true" set and all elements selected by the additionalSelector attribute
