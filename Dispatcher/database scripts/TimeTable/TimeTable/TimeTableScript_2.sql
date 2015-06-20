-- =============================================
-- Fill database TimeTable
-- =============================================
USE TimeTable
GO
 
BULK INSERT TimeTable.dbo.Airplanes
	FROM 'D:\TimeTable\Data\Airplanes.txt'
	WITH (
		DATAFILETYPE = 'widechar',
		FIELDTERMINATOR ='\t',
		ROWTERMINATOR ='\n'
	);
GO

BULK INSERT TimeTable.dbo.Airports
	FROM 'D:\TimeTable\Data\Airports.txt'
	WITH (
		DATAFILETYPE = 'widechar',
		FIELDTERMINATOR ='\t',
		ROWTERMINATOR ='\n'
	);
GO


BULK INSERT TimeTable.dbo.Flights
	FROM 'D:\TimeTable\Data\Flights.txt'
	WITH (
		DATAFILETYPE = 'widechar',
		FIELDTERMINATOR ='\t',
		ROWTERMINATOR ='\n'
	);
GO
