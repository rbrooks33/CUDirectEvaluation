using CUDirectEvaluation.Business;
using CUDirectEvaluation.Business.Models;
using LiteDB;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CUDirectEvaluation.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class EmployeeController : ControllerBase
    {
        private static string dbPath = Environment.CurrentDirectory + "\\Company.db";

        private IWebHostEnvironment _env;

        public EmployeeController(IWebHostEnvironment env)
        {
            _env = env;
        }

        [HttpGet]
        [Route("GetEmployeeModel")]
        public AppsResult GetEmployeeModel()
        {
            return new AppsResult() { Data = new Employee(), Success = true };
        }

        [HttpGet]
        [Route("GetEmployees")]
        public AppsResult GetEmployees()
        {
            var result = new AppsResult();

            try
            {
                using (var db = new LiteDatabase(dbPath))
                {
                    var objs = db.GetCollection<Employee>("Employees");

                    result.Data = objs.FindAll().ToList();
                    result.Success = true;
                }

            }
            catch (Exception ex)
            {
                result.FailMessages.Add("Exception getting employees.");
                AppsLog.LogStep<Business.Flows.Employee.Exception>(ex.ToString());
            }

            return result;
        }
        [HttpGet]
        [Route("GetEmployeeById")]
        public AppsResult GetEmployeeById(int id)
        {
            var result = new AppsResult();

            try
            {
                using (var db = new LiteDatabase(dbPath))
                {
                    var objs = db.GetCollection<Employee>("Employees");

                    result.Data = objs.FindAll().Where(e => e.ID == id).ToList();
                    result.Success = true;
                }

            }
            catch (Exception ex)
            {
                result.FailMessages.Add("Exception getting employee by ID.");
                AppsLog.LogStep<Business.Flows.Employee.Exception>(ex.ToString());
            }

            return result;
        }

        [HttpPost]
        [Route("UpsertEmployee")]
        public AppsResult UpsertEmployee([FromBody] Employee employee)
        {
            var result = new AppsResult();

            try
            {
                using (var dblocal = new LiteDatabase(dbPath))
                {

                    var objs = dblocal.GetCollection<Employee>("Employees");
                    objs.Upsert(employee);

                    result.Data = objs.FindAll().ToList();
                    result.Success = true;
                }

            }
            catch (Exception ex)
            {
                result.FailMessages.Add("Exception saving employee.");
                AppsLog.LogStep<Business.Flows.Employee.Exception>(ex.ToString());
            }

            return result;
        }
        [HttpGet]
        [Route("UnitTests")]
        public AppsResult UnitTests()
        {
            var result = new AppsResult();

            try
            {
                using (var db = new LiteDatabase(dbPath))
                {
                    //get model
                    result = GetEmployeeModel();
                    
                    //bind model
                    //get employees
                    //get single employee
                    //create employee

                }

            }
            catch (Exception ex)
            {
                result.FailMessages.Add("Exception getting employee by ID.");
                AppsLog.LogStep<Business.Flows.Employee.Exception>(ex.ToString());
            }

            return result;
        }



    }
}