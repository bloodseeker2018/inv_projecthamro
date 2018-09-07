-- phpMyAdmin SQL Dump
-- version 4.8.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Sep 03, 2018 at 09:35 AM
-- Server version: 10.1.33-MariaDB
-- PHP Version: 7.2.6

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `project_invhamro`
--

-- --------------------------------------------------------

--
-- Table structure for table `branchs`
--

CREATE TABLE `branchs` (
  `bid` int(11) NOT NULL,
  `branch_name` varchar(255) NOT NULL,
  `status` enum('1','0') NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `branchs`
--

INSERT INTO `branchs` (`bid`, `branch_name`, `status`) VALUES
(1, 'Heyyo', '1'),
(2, 'Hey Yo', '1'),
(3, 'Kathmandu', '1'),
(4, 'Chitwan', '1'),
(5, 'Qwewqe', '1'),
(6, 'Hetauda', '1'),
(7, 'Gg', '1'),
(8, 'Mustang', '1'),
(9, 'Chitlang', '1'),
(10, 'Nawalparasi Pulchowk', '1'),
(11, 'Baglung Parbat', '1'),
(12, 'Kusma Parbat', '1'),
(13, 'Mallaj Lekphant Kusma', '1'),
(14, 'Himalchuli Bhutan', '1'),
(15, 'Nagarkoti Gg', '1');

-- --------------------------------------------------------

--
-- Table structure for table `department`
--

CREATE TABLE `department` (
  `did` int(11) NOT NULL,
  `parent_dep` int(11) NOT NULL,
  `department_name` varchar(255) DEFAULT NULL,
  `status` enum('1','0') NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `department`
--

INSERT INTO `department` (`did`, `parent_dep`, `department_name`, `status`) VALUES
(1, 0, 'It Department', '1'),
(2, 0, 'Counter Section', '1'),
(3, 2, 'Loan', '1'),
(4, 2, 'Savings', '1');

-- --------------------------------------------------------

--
-- Table structure for table `devices`
--

CREATE TABLE `devices` (
  `pid` int(11) NOT NULL,
  `id` int(11) NOT NULL,
  `did` int(11) NOT NULL,
  `bid` int(11) NOT NULL,
  `device_name` varchar(100) NOT NULL,
  `device_brand` varchar(100) NOT NULL,
  `device_model` varchar(100) NOT NULL,
  `added_date` date NOT NULL,
  `remarks` text NOT NULL,
  `d_status` enum('1','0') NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `devices`
--

INSERT INTO `devices` (`pid`, `id`, `did`, `bid`, `device_name`, `device_brand`, `device_model`, `added_date`, `remarks`, `d_status`) VALUES
(1, 3, 1, 3, 'Router', 'Tp_link', 'TP_2224', '2018-09-03', 'strength is not enough', '1'),
(2, 2, 3, 8, 'Laptop', 'Lenovo', 'I7', '2018-09-02', 'not inneed', '1'),
(3, 3, 4, 9, 'Printer', 'Canon', 'CANON_875', '2018-09-27', 'asd', '1');

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `id` int(11) NOT NULL,
  `username` varchar(255) NOT NULL,
  `firstname` varchar(255) NOT NULL,
  `lastname` varchar(255) NOT NULL,
  `password` varchar(300) NOT NULL,
  `usertype` enum('Administrator','Other','Normal_User') NOT NULL,
  `register_date` date NOT NULL,
  `last_login` datetime NOT NULL,
  `remarks` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`id`, `username`, `firstname`, `lastname`, `password`, `usertype`, `register_date`, `last_login`, `remarks`) VALUES
(1, 'anzil.subedi', 'Anzil', 'Subedi', '$2y$08$fXW8BkxC3A0/QdpSiKkYeelqNwqxch4m6oKFQI3AbbrDWkyLbGQAa', 'Administrator', '2018-08-31', '2018-09-03 09:09:14', ''),
(2, 'bigya.khanal', 'Bigya', 'Khanal', '$2y$08$LhiYXMxMymCzsoK07HTZk.eLimWaa2EkkyCYxOg5t64jco43ewFEG', 'Normal_User', '2018-09-03', '2018-09-03 09:09:01', ''),
(3, 'akriti.khanal', 'Akriti', 'Khanal', '$2y$08$ec1qkX.EI5xspOPQzqpkHOznT/96xv084acfJ2YW1Fi8EvS14Dm4u', 'Normal_User', '2018-09-03', '2018-09-03 09:09:45', ''),
(4, 'kriti.devkota', 'Kriti', 'Devkota', '$2y$08$/XZcES9HoVzpJLn1CHkmi.kYJiw4la1gR8IJ/Xv7dPKfpMB.ZYWBO', 'Administrator', '2018-09-03', '2018-09-03 00:00:00', ''),
(5, 'devkota.kriti', 'Kriti', 'Devkota', '$2y$08$DMWeU.u6YtgaDej9Tf1VTOhpF4e9PbIjKA4JF9F8CsYT8fmRtId9e', 'Administrator', '2018-09-03', '2018-09-03 09:09:28', '');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `branchs`
--
ALTER TABLE `branchs`
  ADD PRIMARY KEY (`bid`),
  ADD UNIQUE KEY `branch_name` (`branch_name`);

--
-- Indexes for table `department`
--
ALTER TABLE `department`
  ADD PRIMARY KEY (`did`),
  ADD UNIQUE KEY `department_name` (`department_name`);

--
-- Indexes for table `devices`
--
ALTER TABLE `devices`
  ADD PRIMARY KEY (`pid`),
  ADD UNIQUE KEY `device_name` (`device_name`),
  ADD KEY `id` (`id`),
  ADD KEY `did` (`did`),
  ADD KEY `bid` (`bid`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `username` (`username`),
  ADD UNIQUE KEY `username_2` (`username`),
  ADD UNIQUE KEY `username_3` (`username`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `branchs`
--
ALTER TABLE `branchs`
  MODIFY `bid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT for table `department`
--
ALTER TABLE `department`
  MODIFY `did` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `devices`
--
ALTER TABLE `devices`
  MODIFY `pid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `devices`
--
ALTER TABLE `devices`
  ADD CONSTRAINT `devices_ibfk_1` FOREIGN KEY (`id`) REFERENCES `user` (`id`),
  ADD CONSTRAINT `devices_ibfk_2` FOREIGN KEY (`did`) REFERENCES `department` (`did`),
  ADD CONSTRAINT `devices_ibfk_3` FOREIGN KEY (`bid`) REFERENCES `branchs` (`bid`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
