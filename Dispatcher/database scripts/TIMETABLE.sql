-- =============================================
-- Create database template
-- =============================================
USE master
GO

-- Drop the database if it already exists
IF  EXISTS (
	SELECT name 
		FROM sys.databases 
		WHERE name = N'TimeTable'
)
DROP DATABASE TimeTable
GO

CREATE DATABASE TimeTable
GO

----------------------------------------------------------------------------------
----------------------------------------------------------------------------------


USE [TimeTable]
GO

/****** Object:  Table [dbo].[Airports]    Script Date: 18.06.2015 23:41:54 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[Airports](
	[AirportID] [int] IDENTITY(1,1) NOT NULL,
	[City] [nvarchar](60) NOT NULL,
	[Title] [nvarchar](60) NOT NULL,
	[ABB] [nvarchar](3) NOT NULL,
 CONSTRAINT [PK_Airports_AirportID] PRIMARY KEY CLUSTERED 
(
	[AirportID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO


´------------------------------------------------------------------------------------
-------------------------------------------------------------------------------------
USE [TimeTable]
GO

/****** Object:  Table [dbo].[Airplanes]    Script Date: 18.06.2015 23:41:15 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[Airplanes](
	[AirplaneID] [int] IDENTITY(1,1) NOT NULL,
	[AirplaneType] [nvarchar](60) NOT NULL,
	[NumberOfSeats] [int] NOT NULL,
 CONSTRAINT [PK_Airplanes_AirplaneID] PRIMARY KEY CLUSTERED 
(
	[AirplaneID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO


-------------------------------------------------------------------------------------
-------------------------------------------------------------------------------------
USE [TimeTable]
GO

/****** Object:  Table [dbo].[Flights]    Script Date: 18.06.2015 23:42:02 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[Flights](
	[FlightID] [uniqueidentifier] NOT NULL,
	[AirplaneID] [int] NOT NULL,
	[FlightNumber] [nvarchar](10) NOT NULL,
	[Origin] [int] NOT NULL,
	[DepartureTime] [datetime] NOT NULL,
	[Destination] [int] NOT NULL,
	[ArrivalTime] [datetime] NOT NULL,
 CONSTRAINT [PK_Flights_FlightID] PRIMARY KEY NONCLUSTERED 
(
	[FlightID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO

ALTER TABLE [dbo].[Flights] ADD  DEFAULT (newid()) FOR [FlightID]
GO

ALTER TABLE [dbo].[Flights]  WITH NOCHECK ADD  CONSTRAINT [FK_AirplaneID] FOREIGN KEY([AirplaneID])
REFERENCES [dbo].[Airplanes] ([AirplaneID])
GO

ALTER TABLE [dbo].[Flights] CHECK CONSTRAINT [FK_AirplaneID]
GO

ALTER TABLE [dbo].[Flights]  WITH NOCHECK ADD  CONSTRAINT [FK_DestinationID] FOREIGN KEY([Destination])
REFERENCES [dbo].[Airports] ([AirportID])
GO

ALTER TABLE [dbo].[Flights] CHECK CONSTRAINT [FK_DestinationID]
GO

ALTER TABLE [dbo].[Flights]  WITH NOCHECK ADD  CONSTRAINT [FK_OriginID] FOREIGN KEY([Origin])
REFERENCES [dbo].[Airports] ([AirportID])
GO

ALTER TABLE [dbo].[Flights] CHECK CONSTRAINT [FK_OriginID]
GO


