using NLog;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CUDirectEvaluation.Business
{
    public static class AppsLog
    {
        public static bool LogFlows { get; set; }
        private static readonly NLog.Logger logger = NLog.LogManager.GetCurrentClassLogger();

        public static void Load(string domainOrAppName)
        {
            var nConfig = new NLog.Config.LoggingConfiguration();

            var infoLogfile = new NLog.Targets.FileTarget("infoLogfile") { FileName = @"${basedir}\logs\" + domainOrAppName + @"\INFO_${date:format=yyyy-MM-dd}.log" };
            var errorLogfile = new NLog.Targets.FileTarget("errorLogfile") { FileName = @"${basedir}\logs\" + domainOrAppName + @"\ERROR_${date:format=yyyy-MM-dd}.log" };

            nConfig.AddRule(LogLevel.Info, LogLevel.Info, infoLogfile);
            nConfig.AddRule(LogLevel.Error, LogLevel.Error, errorLogfile);

            NLog.LogManager.Configuration = nConfig;

            LogStep<Flows.Initialize.LoggingInitialized>();
        }
        public class StepLog
        {
            public string FlowAndStep { get; set; }
            public string Data { get; set; }
        }
        public static void LogStep<T>(string data = "")
        {
            var newFlowStep = new StepLog();
            newFlowStep.FlowAndStep = typeof(T).ToString();
            newFlowStep.Data = data;
            string stepLogJson = Newtonsoft.Json.JsonConvert.SerializeObject(newFlowStep);

            WriteInfoToLogFile("Flow: " + typeof(T) + ". Data: " + data);

            if (AppsLog.LogFlows)
            {
                logger.Info(stepLogJson);
            }
        }
     
        public static void WriteTextToLogFile(string AdditionalInfo, string DumpQuery = "")
        {
            logger.Error(AdditionalInfo);
        }
        public static void WriteInfoToLogFile(string AdditionalInfo)
        {
            logger.Info(AdditionalInfo);
        }
    }
}
