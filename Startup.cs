using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SpaServices.ReactDevelopmentServer;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using System;

namespace Wrapper
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        public static Config Config { get; private set; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddMvc().SetCompatibilityVersion(CompatibilityVersion.Version_2_1);

            // In production, the React files will be served from this directory
            services.AddSpaStaticFiles(configuration =>
            {
                configuration.RootPath = "ClientApp/build";
            });
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env)
        {
            Config = new Config
            {
                GoalsBackenUrl = Environment.GetEnvironmentVariable("GOALS_BACKEND_URL"),
                Firebase = new FirebaseConfig {
                    ApiKey = Environment.GetEnvironmentVariable("GOALS_FIREBASE_API_KEY"),
                    AuthDomain = Environment.GetEnvironmentVariable("GOALS_FIREBASE_AUTH_DOMAIN"),
                    DatabaseURL = Environment.GetEnvironmentVariable("GOALS_FIREBASE_DATABASE_URL"),
                    ProjectId = Environment.GetEnvironmentVariable("GOALS_FIREBASE_PROJECT_URL"),
                    StorageBucket = Environment.GetEnvironmentVariable("GOALS_FIREBASE_STORAGE_BUCKET"),
                    MessagingSenderId = Environment.GetEnvironmentVariable("GOALS_FIREBASE_MESSAGING_SENDER_ID")
                }
            };

            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                app.UseExceptionHandler("/Error");
                app.UseHsts();
            }

            app.UseHttpsRedirection();
            app.UseStaticFiles();
            app.UseSpaStaticFiles();

            app.UseMvc(routes =>
            {
                routes.MapRoute(
                    name: "default",
                    template: "{controller}/{action=Index}/{id?}");
            });

            app.UseSpa(spa =>
            {
                spa.Options.SourcePath = "ClientApp";

                if (env.IsDevelopment())
                {
                    spa.UseReactDevelopmentServer(npmScript: "start");
                }
            });
        }
    }
}
