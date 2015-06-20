-- =========================================
-- Create table template
-- =========================================
USE SessionDB
GO

IF OBJECT_ID('dbo.Users', 'U') IS NOT NULL
  DROP TABLE dbo.Users
GO

CREATE TABLE dbo.Users
(
	UserId int IDENTITY(1,1) NOT NULL PRIMARY KEY,  
	Login nvarchar(50) NOT NULL,
	Password nvarchar(50) NOT NULL, 
	FirstName nvarchar(50) NOT NULL, 
	SecondName nvarchar(50) NOT NULL, 
	MiddleName nvarchar(50) NULL, 
	PostName nvarchar(50) NULL, 
	RoleId int NOT NULL, 
	DateTo datetime NULL, 
	DateFrom datetime NULL, 
	Token nvarchar(50) NULL, 
)
GO

SET IDENTITY_INSERT Users ON;
GO

INSERT INTO Users(UserId, Login, Password, FirstName, SecondName, MiddleName, PostName, RoleId)
VALUES(IDENT_CURRENT('Users')+1, 'yershov', '123456', '������', '�����', '����������', '�������������', 0);

INSERT INTO Users(UserId, Login, Password, FirstName, SecondName, MiddleName, PostName, RoleId)
VALUES(IDENT_CURRENT('Users')+1,'ivanova', 'qwerty', '����', '�������', '��������', '��������� �������������� ������', 1);

INSERT INTO Users(UserId, Login, Password, FirstName, SecondName, MiddleName, PostName, RoleId)
VALUES(IDENT_CURRENT('Users')+1,'gagarin', 'kedr', '����', '�������', '����������', '��������� �������', 2);

INSERT INTO Users(UserId, Login, Password, FirstName, SecondName, MiddleName, PostName, RoleId)
VALUES(IDENT_CURRENT('Users')+1,'vibegallo', '123456', '��������', '���������', '�����������', '��������� ������ � �������', 3);