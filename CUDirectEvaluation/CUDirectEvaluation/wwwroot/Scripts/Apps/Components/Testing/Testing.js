define([], function () {
    var Me = {
        Enabled: true,
        Color: 'blue',
        Name: 'Testing',
        Initialize: function (callback) {

            Apps.LoadTemplate('Testing', Apps.Settings.WebRoot + '/' + Apps.Settings.AppsRoot + '/Components/Testing/Testing.html', function () {

                Apps.LoadStyle(Apps.Settings.WebRoot + '/' + Apps.Settings.AppsRoot + '/Components/Testing/Testing.css');

                //Me.Show();

            });

        },
        Show: function () {
            Apps.UI.Testing.Show();
        },
        Minimize: function () {
            //105 h53
            var jq = $ ? $ : Apps.$;
            jq('.TestingContentStyle').css('height', '53px').css('width', '105px');
        },
        Maximize: function () {
            var jq = $ ? $ : Apps.$;
            jq('.TestingContentStyle').css('height', '300px').css('width', '300px');
        },
        Test: function (type) {

            Apps.Notify('warning', 'Testing underway.');

            var SetValue = Me.SetValue;
            var SetIndex = Me.SetIndex;
            var SetRadio = Me.SetRadio;

            //Tests here

        },

        SetValue: function (elementId, val) {
            try {
                F('#' + elementId).visible().click().type(val);
                F('#' + elementId).type("[tab]");
                //F('#' + elementId).visible()[0].value = val;

            }
            catch (err) {
                //console.error(err);
            }
        },
        SetIndex: function (elementId, index) {
            try {
                F('#' + elementId).visible()[0].selectedIndex = index;
                F('#' + elementId).type("[down]");
                F('#' + elementId).type("[up]");
                //F('#namedfirst5').visible().click();
            }
            catch (err) {
                //console.error(err);
            }
        },
        SetRadio: function (elementId) {
            try {

                F('#' + elementId).visible()[0].checked = true;
                F('#' + elementId).click();
            }
            catch (err) {
                //console.error(err);
            }
        }

    };
    return Me;
});