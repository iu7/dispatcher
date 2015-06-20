-- =============================================
-- Create database TimeTable
-- =============================================
USE [master]
GO

-- Drop the database if it already exists
IF  EXISTS (SELECT name FROM sys.databases WHERE name = N'TimeTable')
	DROP DATABASE TimeTable;
GO

CREATE DATABASE TimeTable;
GO

USE TimeTable
GO

-- =========================================
-- Create table Airplanes 
-- =========================================
CREATE TABLE dbo.Airplanes
(
	AirplaneID INT IDENTITY(1,1) NOT NULL, -- Идентификатор самолета
	AirplaneType NVARCHAR (60) NOT NULL,  -- Тип самолёта
	NumberOfSeats INT NOT NULL, -- Количество мест
	CONSTRAINT [PK_Airplanes_AirplaneID] PRIMARY KEY CLUSTERED ([AirplaneID])
);
GO

-- =========================================
-- Create table Airports
-- =========================================
CREATE TABLE dbo.Airports
(
	AirportID INT IDENTITY(1,1) NOT NULL, -- Идентификатор Аэропорта
	City NVARCHAR (60) NOT NULL, -- Город Аэропорта
	Title NVARCHAR (60) NOT NULL, -- Название аэропорта
	ABB NVARCHAR (3) NOT NULL, -- Аббривиатура 
	CONSTRAINT [PK_Airports_AirportID] PRIMARY KEY CLUSTERED ([AirportID])
);
GO

-- =========================================
-- Create table Flights
-- =========================================
CREATE TABLE dbo.Flights
(
	FlightID [uniqueidentifier] NOT NULL DEFAULT NEWID(), -- Идентификатор полета
	AirplaneID INT NOT NULL, -- Идентификатор самолета
	FlightNumber NVARCHAR (10) NOT NULL, -- Номер рейса
	Origin INT NOT NULL, -- ID Аэропорт вылета
	DepartureTime DATETIME NOT NULL, -- Время вылета
	Destination INT NOT NULL, -- ID Аэропорт назначения
	ArrivalTime DATETIME NOT NULL, -- Время прилета
	CONSTRAINT [PK_Flights_FlightID] PRIMARY KEY NONCLUSTERED ([FlightID] ASC),
	CONSTRAINT [FK_AirplaneID] FOREIGN KEY (AirplaneID) REFERENCES Airplanes (AirplaneID),		
	CONSTRAINT [FK_OriginID] FOREIGN KEY (Origin) REFERENCES Airports (AirportID),
	CONSTRAINT [FK_DestinationID] FOREIGN KEY (Destination) REFERENCES Airports (AirportID)	
);
GO
