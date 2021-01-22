define(['./Controls/Controls.js'], function (controls) {
    var Me = {
        Controls: controls,
        Initialize: function (callback) {

            Apps.LoadTemplate('Employee', '/Scripts/Apps/Components/Company/Employee/Employee.html', function () {
                Apps.LoadStyle(Apps.Settings.WebRoot + '/Scripts/Apps/Components/Company/Employee/Employee.css');

                Apps.UI.Employee.Show();

                //Load employee detail template
                let employeeModelHTML = Apps.Util.GetHTML('Company_Employee_EmployeeInfo_Template');
                $('#Company_Employees_EmployeeDetail_Div').hide().html(employeeModelHTML);

                callback();
            });

        },
        Show: function () {

            Me.Initialize(function () {
                Me.Bind();
            });

        },
        Bind: function () {

            Me.GetEmployeeModel(function (model) {

                Me.BindEmployeeModel(model, function () {

                    Apps.Bind.Validate('EmployeeModel', Me.Controls);

                });

            });

            Me.GetEmployees(function (employees) {

                Me.BindEmployees(employees);

            });

        },
        GetEmployeeModel: function (callback) {
            Apps.Get2('/api/Employee/GetEmployeeModel', function (result) {

                if (result.Success) {
                    callback(result.Data);
                }

            });
        },
        BindEmployeeModel: function (model, callback) {
            Apps.Bind.DataBindControls(model, 'EmployeeModel', Me.Controls);

            //TODO: Binding auto-populates when model is filled, find a way to opt-out 
            $('#Company_Employee_Name_Textbox').val('');
            $('#Company_Employee_Address_Textbox').val('');

            if(callback)
                callback();
        },
        GetEmployees: function (callback) {
            Apps.Get2('/api/Employee/GetEmployees', function (result) {

                if (result.Success) {
                    //Apps.Notify('info', 'got model.');
                    callback(result.Data);
                }

            });
        },
        BindEmployees: function (employees) {

            Apps.Util.RefreshCombobox(employees, 'Company_Employee_Employee_Select', null, 'Select An Employee', 'ID', 'Name', function () {
                //Selection event
                Me.GetEmployeeById();
            });

        },
        GetEmployeeById: function () {

            let selectedEmployeeId = $('#Company_Employee_Employee_Select').val();

            Apps.Get2('/api/Employee/GetEmployeeById?id=' + selectedEmployeeId, function (result) {

                if (result.Success) {

                    Me.BindEmployeeModel(result.Data[0]);
                    $('#Company_Employees_EmployeeDetail_Div').show(400);

                }

            });
        },
        Create: function () {

            if (Apps.Bind.Validate('EmployeeModel', Me.Controls)) {

                Me.GetEmployeeModel(function (model) {

                    let name = $('#Company_Employee_Name_Textbox').val();
                    let address = $('#Company_Employee_Address_Textbox').val();

                    model.Name = name;
                    model.Address = address;

                    Apps.Post2('/api/Employee/UpsertEmployee', JSON.stringify(model), function (result) {

                        if (result.Success) {
                            Apps.Notify('info', 'Employee successfully created!');

                            Me.Bind();
                        }
                    });
                });
            }
            else {
                Apps.Notify('warning','Please enter correctly-formatted name and address.')
            }
        },
        Test: function () {

            //NOTE: This represents my feeble entry into formal testing
            //bind model
            //get employees
            //get single employee
            //create employee

            //unit tests
            Apps.Get('/api/Employee/UnitTests', function (error, result) {

                if (!error && result.Success) {

                    //functional tests
                    QUnit.config.autostart = false;

                    QUnit.module('Create Employee');

                    QUnit.test('Fail creating with 3-letter name', assert => {

                        $('#Company_Employee_Name_Textbox').val('fdr');
                        $('#Company_Employee_Address_Textbox').val('1234');

                        assert.false(Apps.Bind.Validate('EmployeeModel', Me.Controls))
                    });

                    QUnit.test('Fail creating employee using non-numerical address', assert => {

                        $('#Company_Employee_Name_Textbox').val('fdlkjl');
                        $('#Company_Employee_Address_Textbox').val('123x');

                        assert.false(Apps.Bind.Validate('EmployeeModel', Me.Controls))
                    });

                    QUnit.start();

                    QUnit.done(details => {
                        Apps.Notify('info', "Total: " + details.total + " Failed: " + details.failed
                            + " Passed: " + details.passed);
                    });
                }
                else {
                    Apps.Notify('warning', 'Server unit tests failed.');
                }

            });

        }
    };
    return Me;
})