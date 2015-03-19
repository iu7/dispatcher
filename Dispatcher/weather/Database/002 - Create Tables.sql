

USE [Weather]
GO

/****** Object:  Table [dbo].[HourlyForecast]    Script Date: 19.03.2015 15:00:28 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[HourlyForecast](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[ICAOcode] [nvarchar](50) NULL,
	[DateAndTime] [datetime] NULL,
	[WindDirection] [int] NULL,
	[WindSpeed] [int] NULL,
	[Visibility] [nvarchar](50) NULL,
	[Weather] [nvarchar](50) NULL,
	[Clouds] [nvarchar](50) NULL,
	[Temperature] [int] NULL,
	[Dewpoint] [int] NULL,
	[QNH] [int] NULL,
	[Forecast] [nvarchar](50) NULL
) ON [PRIMARY]

CREATE TABLE [dbo].[IntarnationalForecast](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[ICAOcode] [nvarchar](50) NULL,
	[DateAndTime] [datetime] NULL,
	[WindDirection] [int] NULL,
	[WindSpeed] [int] NULL,
	[Visibility] [nvarchar](50) NULL,
	[Weather] [nvarchar](50) NULL,
	[Clouds] [nvarchar](50) NULL,
	[Temperature] [int] NULL,
	[Dewpoint] [int] NULL,
	[QNH] [int] NULL,
	[Forecast] [nvarchar](50) NULL
) ON [PRIMARY]

CREATE TABLE [dbo].[Parameters](
	[Item] [nvarchar](50) NOT NULL,
	[English] [nvarchar](100) NULL,
	[Russian] [nvarchar](100) NULL,
 CONSTRAINT [PK_Parameters] PRIMARY KEY CLUSTERED 
(
	[Item] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO


