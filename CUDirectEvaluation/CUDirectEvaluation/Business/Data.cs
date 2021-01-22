using CUDirectEvaluation.Business.Models;
using Microsoft.EntityFrameworkCore;

namespace CUDirectEvaluation.Business
{
    public class Data : DbContext
    {
        public Data() : base()
        {

        }

        public Data(DbContextOptions options)
            : base(options)
        {

        }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseInMemoryDatabase("Company");
        }

        public DbSet<Employee> Employees { get; set; }
    }
}
