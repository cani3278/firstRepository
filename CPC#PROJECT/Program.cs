
using BL.Api;

namespace CPC_PROJECT
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);
            //cors
            builder.Services.AddCors(c => c.AddPolicy("AllowAll",
            option => option.AllowAnyOrigin().AllowAnyHeader().AllowAnyMethod()));


            // Add services to the container.

            builder.Services.AddControllers();
            builder.Services.AddSingleton<IBL, BL.BLManager>();
            // Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
            builder.Services.AddEndpointsApiExplorer();
            builder.Services.AddSwaggerGen();

            var app = builder.Build();
               app.UseCors("AllowAll");
            // Configure the HTTP request pipeline.
            if (app.Environment.IsDevelopment())
            {
                app.UseSwagger();
                app.UseSwaggerUI();
            }

            app.UseHttpsRedirection();

            app.UseAuthorization();


            app.MapControllers();

            app.Run();
        }
    }
}
