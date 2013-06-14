-- phpMyAdmin SQL Dump
-- version 3.4.10.1deb1
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Erstellungszeit: 14. Jun 2013 um 11:14
-- Server Version: 5.5.29
-- PHP-Version: 5.3.10-1ubuntu3.6

SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Datenbank: `db199062_345`
--
CREATE DATABASE `db199062_345` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE `db199062_345`;

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `positions`
--

CREATE TABLE IF NOT EXISTS `positions` (
  `position_id` int(11) NOT NULL AUTO_INCREMENT,
  `lat` float NOT NULL,
  `lng` float NOT NULL,
  `user_id` int(10) NOT NULL,
  `timestamp` datetime NOT NULL,
  PRIMARY KEY (`position_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci AUTO_INCREMENT=21 ;

--
-- Daten für Tabelle `positions`
--

INSERT INTO `positions` (`position_id`, `lat`, `lng`, `user_id`, `timestamp`) VALUES
(3, 53, 10, 1, '2013-06-13 08:11:48'),
(4, 53.1, 10.1, 1, '2013-06-13 08:12:09'),
(5, 53.2, 10.2, 1, '2013-06-13 08:12:16'),
(6, 53.3, 10.3, 1, '2013-06-13 08:12:25'),
(7, 53.3, 10.3, 2, '2013-06-13 08:12:37'),
(8, 53.4, 10.3, 2, '2013-06-13 08:12:41'),
(9, 53.5, 10.3, 2, '2013-06-13 08:12:46'),
(10, 53.6, 10.3, 2, '2013-06-13 08:12:51'),
(11, 53.6, 10.4, 2, '2013-06-13 08:12:57'),
(12, 53.3, 10.01, 1, '2013-06-13 00:00:00'),
(19, 53.21, 9.9, 2, '2013-06-13 09:44:51'),
(20, 53.21, 9.9, 1, '2013-06-13 09:45:20');

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `users`
--

CREATE TABLE IF NOT EXISTS `users` (
  `user_id` int(11) NOT NULL,
  `username` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `startNr` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `userlevel` tinyint(4) NOT NULL,
  PRIMARY KEY (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Daten für Tabelle `users`
--

INSERT INTO `users` (`user_id`, `username`, `startNr`, `userlevel`) VALUES
(1, 'Fritz', '1', 0),
(2, 'Wilhelm', '2', 0);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
