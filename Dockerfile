FROM microsoft/dotnet:2.1-aspnetcore-runtime-alpine AS base
WORKDIR /app
EXPOSE 80
ENV ASPNETCORE_ENVIRONMENT=Production
ENV GOALS_BACKEND_URL=

FROM mhart/alpine-node:9 AS frontend-builder
WORKDIR /usr/src/app
COPY ./ClientApp/package.json ./ClientApp/yarn.lock ./
RUN yarn
COPY ./ClientApp .
RUN yarn build

FROM microsoft/dotnet:2.1-sdk AS backend-builder
WORKDIR /src
COPY . .
RUN dotnet restore -nowarn:msb3202,nu1503
RUN dotnet build --no-restore -c Release -o /app

FROM backend-builder AS publish
RUN dotnet publish --no-restore -c Release -o /app

FROM base AS final
WORKDIR /app
COPY --from=publish /app .
COPY --from=frontend-builder /usr/src/app/build /app/ClientApp/build
ENTRYPOINT ["dotnet", "Wrapper.dll"]