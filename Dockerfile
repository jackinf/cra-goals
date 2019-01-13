FROM microsoft/dotnet:2.1-aspnetcore-runtime-alpine AS base
WORKDIR /app
EXPOSE 80
ENV ASPNETCORE_ENVIRONMENT=Production
ENV GOALS_BACKEND_URL=""
ENV GOALS_FIREBASE_API_KEY=""
ENV GOALS_FIREBASE_AUTH_DOMAIN=""
ENV GOALS_FIREBASE_DATABASE_URL=""
ENV GOALS_FIREBASE_PROJECT_URL=""
ENV GOALS_FIREBASE_STORAGE_BUCKET=""
ENV GOALS_FIREBASE_MESSAGING_SENDER_ID=""

FROM mhart/alpine-node:9 AS frontend-builder
WORKDIR /usr/src/app
COPY ./ClientApp/package.json ./ClientApp/package-lock.json ./
RUN npm install
COPY ./ClientApp .
RUN npm run build

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
