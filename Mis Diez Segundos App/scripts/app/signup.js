/**
 * Signup view model
 */
var app = app || {};

app.Signup = (function () {
    'use strict';

    var singupViewModel = (function () {

        var dataSource;
        var $signUpForm;
        var $formFields;
        var $signupBtnWrp;

        var validator;


        // Register user after required fields (username and password) are validated in Backend Services
        var signup = function () {
            //app.showAlert("Hello World");
//            dataSource.Gender = parseInt(dataSource.Gender);
            dataSource.Gender = dataSource.Gender;
            var birthDate = new Date(dataSource.BirthDate);

            if (birthDate.toJSON() === null) {
                birthDate = new Date();
            }

            dataSource.BirthDate = birthDate;

            validator = $signUpForm.kendoValidator({
                validateOnBlur: false,
                rules: {
                    signupUsername: function (input) {
                        // Only "Tom" will be a valid value for the FirstName input
                        var bReturn = false;
                        /*
                    if (ignore)
                        return true;
 
                    if (input.is("[name!=signupUsername]"))
                        return true;
                    */
                        if (input.is("[name=signupUsername]") && input.val().length > 5) {
                            bReturn = true;
                        /*} else if (input.is("[name=signupUsername]")) {
                            bReturn = false;
                        */
                        }

                        return bReturn;
                    },
                    signupPassword: function (input) {
                        // Only "Tom" will be a valid value for the FirstName input
                        var bReturn = false;

                        if (input.is("[name=signupPassword]") && input.val().length > 5) {
                            bReturn = true;
                        /*
                        } else { // if (input.is("[name=signupPassword]")) {
                            bReturn = false;
                        } else {
                            bReturn = true;
                        */
                        }

                        return bReturn;
                    },
                    signupBirthDatePicker: function(input){
                        var bReturn = true;
                        
                        if(input.is("[name=signupBirthDatePicker]")){
                            //calculate differenct in birthdate
                            var todayDate = new Date();
                            var minDate = new Date(todayDate.setFullYear(todayDate.getFullYear() - 18));
                            var bdateDiff = new Date(minDate - birthDate);
                            
                            if(bdateDiff > 0){
                                bReturn = true;
                            } else {
                                bReturn = false;
                            }
                        }
                        
                        return bReturn;
                    }
                },
                messages: {
                    signupUsername: "Your username name must be at least 4 characters",
                    signupPassword: "Your password name must be at least 4 characters",
                    signupBirthDatePicker: "You must be at least 18 for this service",
                
                }
            }).data('kendoValidator');
            
            

            //alert(Object.keys(validator));

            //app.showAlert("Validate: " + validator.validate());
            
//            if(validator.validateInput($("input[name=signupUsername]"))){}

            if (validator.validate()) {
                //$signupBtnWrp.removeClass('disabled');

                Everlive.$.Users.register(
                    dataSource.Username,
                    dataSource.Password,
                    dataSource)
                    .then(function () {
                            app.showAlert("Registration successful");
                            app.mobileApp.navigate('#welcome');
                        },
                        function (err) {
                            app.showError(err.message);
                        });
            } else {
                //$signupBtnWrp.addClass('disabled');
            }
            

        };

        // Executed after Signup view initialization
        // init form validator
        var init = function () {

            $signUpForm = $('#signUp');
            $formFields = $signUpForm.find('input, textarea, select');
            $signupBtnWrp = $('#signupBtnWrp');
            var ignore = false;

            /*
            validator = $signUpForm.kendoValidator({
                validateOnBlur: false,
                rules: {
                    signupUsername: function (input) {
                        // Only "Tom" will be a valid value for the FirstName input
                        var bReturn = true;
                        
                    if (ignore)
                        return true;
 
                    if (input.is("[name!=signupUsername]"))
                        return true;
                    
                        if (input.is("[name=signupUsername]") && input.val() === "Tom") {
                            bReturn = true;
                        } else if (input.is("[name=signupUsername]") && input.val() != "Tom") {
                            bReturn = false;
                        }

                        return bReturn;
                    },
                    signupPassword: function (input) {
                        // Only "Tom" will be a valid value for the FirstName input
                        var bReturn = true;

                        if (input.is("[name=signupPassword]") && input.val() === "Piggott") {
                            bReturn = true;
                        } else if (input.is("[name=signupPassword]") && input.val() != "Piggott") {
                            bReturn = false;
                        } else {
                            bReturn = true;
                        }

                        return bReturn;
                    }
                },
                messages: {
                    signupUsername: "Your username name must be Tom",
                    signupPassword: "Your password name must be Piggott"
                }
            }).data('kendoValidator');
            validator = $signUpForm.kendoValidator({
                validateOnBlur: false
            }).data('kendoValidator');

            $formFields.on('keyup keypress blur change input', function () {
                if (validator.validate()) {
                    $signupBtnWrp.removeClass('disabled');
                } else {
                    $signupBtnWrp.addClass('disabled');
                }
            });
            */
        }

        // Executed after show of the Signup view
        var show = function () {

            dataSource = kendo.observable({
                Username: '',
                Password: '',
                DisplayName: '',
                Email: '',
                Gender: '',
                About: '',
                Friends: [],
                BirthDate: new Date()
            });
            kendo.bind($('#signup-form'), dataSource, kendo.mobile.ui);
        };

        // Executed after hide of the Signup view
        // disable signup button
        var hide = function () {
            $signupBtnWrp.addClass('disabled');
        };

        var onSelectChange = function (sel) {
            var selected = sel.options[sel.selectedIndex].value;
            sel.style.color = (selected == 0) ? '#b6c5c6' : '#34495e';
        }

        return {
            init: init,
            show: show,
            //hide: hide,
            onSelectChange: onSelectChange,
            signup: signup
        };

    }());

    return singupViewModel;

}());