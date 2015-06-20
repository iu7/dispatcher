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
	AirplaneID INT IDENTITY(1,1) NOT NULL, -- ������������� ��������
	AirplaneType NVARCHAR (60) NOT NULL,  -- ��� �������
	NumberOfSeats INT NOT NULL, -- ���������� ����
	CONSTRAINT [PK_Airplanes_AirplaneID] PRIMARY KEY CLUSTERED ([AirplaneID])
);
GO

-- =========================================
-- Create table Airports
-- =========================================
CREATE TABLE dbo.Airports
(
	AirportID INT IDENTITY(1,1) NOT NULL, -- ������������� ���������
	City NVARCHAR (60) NOT NULL, -- ����� ���������
	Title NVARCHAR (60) NOT NULL, -- �������� ���������
	ABB NVARCHAR (3) NOT NULL, -- ������������ 
	CONSTRAINT [PK_Airports_AirportID] PRIMARY KEY CLUSTERED ([AirportID])
);
GO

-- =========================================
-- Create table Flights
-- =========================================
CREATE TABLE dbo.Flights
(
	FlightID [uniqueidentifier] NOT NULL DEFAULT NEWID(), -- ������������� ������
	AirplaneID INT NOT NULL, -- ������������� ��������
	FlightNumber NVARCHAR (10) NOT NULL, -- ����� �����
	Origin INT NOT NULL, -- ID �������� ������
	DepartureTime DATETIME NOT NULL, -- ����� ������
	Destination INT NOT NULL, -- ID �������� ����������
	ArrivalTime DATETIME NOT NULL, -- ����� �������
	CONSTRAINT [PK_Flights_FlightID] PRIMARY KEY NONCLUSTERED ([FlightID] ASC),
	CONSTRAINT [FK_AirplaneID] FOREIGN KEY (AirplaneID) REFERENCES Airplanes (AirplaneID),		
	CONSTRAINT [FK_OriginID] FOREIGN KEY (Origin) REFERENCES Airports (AirportID),
	CONSTRAINT [FK_DestinationID] FOREIGN KEY (Destination) REFERENCES Airports (AirportID)	
);
GO
