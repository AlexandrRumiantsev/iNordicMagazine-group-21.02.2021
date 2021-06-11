-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Хост: localhost
-- Время создания: Июн 06 2021 г., 11:15
-- Версия сервера: 10.4.13-MariaDB
-- Версия PHP: 7.4.8

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- База данных: `iNordic`
--

-- --------------------------------------------------------

--
-- Структура таблицы `goods`
--

CREATE TABLE `goods` (
  `ID` text COLLATE utf8_bin NOT NULL,
  `TITLE` text COLLATE utf8_bin NOT NULL,
  `DISCR` text COLLATE utf8_bin NOT NULL,
  `COUNT` text COLLATE utf8_bin NOT NULL,
  `PRICE` text COLLATE utf8_bin NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- --------------------------------------------------------

--
-- Структура таблицы `users`
--

CREATE TABLE `users` (
  `ID` text COLLATE utf8_bin NOT NULL,
  `FIO` text COLLATE utf8_bin NOT NULL,
  `ADDR` text COLLATE utf8_bin NOT NULL,
  `PHONE` text COLLATE utf8_bin NOT NULL,
  `NAME` text COLLATE utf8_bin NOT NULL,
  `FAMILY` text COLLATE utf8_bin NOT NULL,
  `LASTNAME` text COLLATE utf8_bin NOT NULL,
  `LOGIN` text COLLATE utf8_bin NOT NULL,
  `PASSWORD` text COLLATE utf8_bin NOT NULL,
  `IMG` text COLLATE utf8_bin NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Дамп данных таблицы `users`
--

INSERT INTO `users` (`ID`, `FIO`, `ADDR`, `PHONE`, `NAME`, `FAMILY`, `LASTNAME`, `LOGIN`, `PASSWORD`, `IMG`) VALUES
('60b21937bd291', 'dsadsaТестdsad', '123213', '123-45-678', 'Тест', 'dsadsa', 'dsad', 'filippova-ed', 'dasdsd', 'dsadsa');
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
