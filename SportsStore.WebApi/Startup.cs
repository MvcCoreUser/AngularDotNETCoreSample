﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Community.Microsoft.Extensions.Caching.PostgreSql;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using Newtonsoft.Json;
using SportsStore.WebApi.Models;

namespace SportsStore.WebApi
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddDbContext<IdentityDataContext>(options =>
            {
                options.UseNpgsql(Configuration["Data:Identity:ConnectionString"]);
            });

            services.AddIdentity<IdentityUser, IdentityRole>()
                    .AddEntityFrameworkStores<IdentityDataContext>();

            services.AddDbContext<DataContext>(options =>
            {
                options.UseNpgsql(Configuration["Data:Products:ConnectionString"]);
            });
            services.AddCors(options =>
            {
                options.AddPolicy("default",
                    builder => builder
                        .AllowAnyOrigin()
                        .AllowAnyMethod()
                        .AllowAnyHeader()
                );
            });
            services.AddMvc()
                .SetCompatibilityVersion(CompatibilityVersion.Version_2_2)
                .AddJsonOptions(options=> {
                    options.SerializerSettings.ReferenceLoopHandling = ReferenceLoopHandling.Serialize;
                    options.SerializerSettings.NullValueHandling = NullValueHandling.Ignore;
                    });
            services.AddDistributedPostgreSqlCache(options =>
            {
                options.SchemaName = Configuration[$"Data:Products:Caching:{nameof(options.SchemaName)}"];
                options.TableName = Configuration[$"Data:Products:Caching:{nameof(options.TableName)}"];
                options.ConnectionString = Configuration["Data:Products:ConnectionString"];
            });

            services.AddSession(options =>
            {
                options.Cookie.Name = "SportsStore.Session";
                options.IdleTimeout = TimeSpan.FromHours(48);
            });
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            //app.UseCors(builder => builder.WithOrigins(Configuration["ClientUrl"]).AllowAnyMethod().AllowCredentials().AllowAnyHeader());
            app.UseSession();
            app.UseAuthentication();
            app.UseCors("default");
            app.UseMvcWithDefaultRoute();
            using (var scope = app.ApplicationServices.CreateScope())
            {
                SeedData.SeedDatabase(scope.ServiceProvider.GetRequiredService<DataContext>());
            }
            IdentitySeedData.SeedDatabase(app);
            
        }
    }
}
