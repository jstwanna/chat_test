using DbUp;
using DbUp.Engine.Output;
using Microsoft.Extensions.Logging;
using System.Reflection;
using System.Text.RegularExpressions;

namespace Chat.Data.Database
{
    public class DBMigrations : IUpgradeLog
    {
        private static readonly Regex toFindScriptRegex = new(@"^Chat\.Data\.Database\.Migrations\..*\d{3}.*\.sql$");

        private const string MigrationTableName = "migrations";

        private readonly string _connectionString;
        private readonly ILogger<DBMigrations> _logger;

        public DBMigrations (DBOptions options, ILogger<DBMigrations> logger)
        {
            _connectionString = options.connStr;
            _logger = logger;
        }

        public void Apply ()
        {
            EnsureDatabase.For.PostgresqlDatabase(_connectionString, this);

            var upgrader = DeployChanges.To
                .PostgresqlDatabase(_connectionString)
                .JournalToPostgresqlTable("public", MigrationTableName)
                .WithScriptsAndCodeEmbeddedInAssembly(Assembly.GetExecutingAssembly(), toFindScriptRegex.IsMatch)
                .WithTransactionPerScript()
                .LogTo(this)
                .Build();

            var result = upgrader.PerformUpgrade();

            if (!result.Successful)
            {
                throw new Exception(result.ErrorScript.Name, result.Error);
            }
        }

        public void WriteInformation (string format, params object[] args)
        {
            _logger.LogInformation(format, args);
        }

        public void WriteError (string format, params object[] args)
        {
            _logger.LogError(format, args);
        }

        public void WriteWarning (string format, params object[] args)
        {
            _logger.LogWarning(format, args);
        }
    }
}
