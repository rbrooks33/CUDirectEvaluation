define([], function () {
    var Me = {
        ValidationState: {
            Incomplete: 1, //Useful when required
            Failed: 2,
            Passed: 3,
            OptOut: 4
        },
        Control: function (index, component, selector, defaults, handle, validate, bound, changed, cleanse) {
            this.Index = index; //Used when binding collections
            this.MyComponent = component;
            this.Selector = selector; //Control's JQuery element
            this.Defaults = defaults; //On bind, a chance to set default values
            this.Handle = handle; //On bind, a chance to set up validation
            this.Validate = validate; //On validate
            this.Bound = bound; //On bound
            this.Changed = changed; //On changed
            this.Cleanse = cleanse; //On bind, a chance to clean data
        },
        ID: {},
        Name: {
            Selector: null,
            Changed: function (propertyName, newValue) {

            },
            Validate: function () {
                var result = Me.ValidationState.Passed;
                this.Selector.css('border-color', 'green');

                if (this.Selector.val().length == 0) {
                    this.Selector.css('border-color', 'orange');
                    result = Me.ValidationState.Incomplete;
                }
                else if (this.Selector.val().length > 0 && this.Selector.val().length < 4) {
                    this.Selector.css('border-color', 'red');
                    result = Me.ValidationState.Failed;
                }
                return result;
            },
            FailMessage: 'Your name must be at least 4 characters.',
            IncompleteMessage: 'Please provide your name.'
        },
        Address: {
            Selector: null,
            Changed: function (propertyName, newValue) {

            },
            Validate: function () {
                var result = Me.ValidationState.Passed;
                this.Selector.css('border-color', 'green');

                if (this.Selector.val().length == 0) {
                    this.Selector.css('border-color', 'orange');
                    result = Me.ValidationState.Incomplete;
                }
                else if (this.Selector.val().length > 0 && !Apps.Util.IsNumber(this.Selector.val())) {
                    this.Selector.css('border-color', 'red');
                    result = Me.ValidationState.Failed;
                }

                return result;
            },
            FailMessage: 'Your address must be a number.',
            IncompleteMessage: 'Please provide your address.'
        },
        Role: {},
        Department: {},
        Skillsets: {},
        DateOfBirth: {},
        DateOfJoining: {},
        IsActive: {}

    };
    return Me;
});