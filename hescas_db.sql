-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Mar 11, 2022 at 06:57 PM
-- Server version: 10.4.22-MariaDB
-- PHP Version: 8.0.15

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `hescas_db`
--

-- --------------------------------------------------------

--
-- Table structure for table `esp32`
--

CREATE TABLE `esp32` (
  `hsId` int(12) NOT NULL,
  `place` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `user_id` int(10) NOT NULL,
  `fullname` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `passwd` varchar(255) NOT NULL,
  `token` varchar(255) DEFAULT NULL,
  `image_profile` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`user_id`, `fullname`, `email`, `passwd`, `token`, `image_profile`) VALUES
(1, '0', 'test001@gmail.com', '$2a$10$gyPwerVdNZEbFxNqJno1QOfniL7OqhBfBUcyohMT1y92YSGed/jUS', NULL, NULL),
(2, '0', 'test002@gmail.com', '$2a$10$aPEnROTBS1BFZJWm/YWvl.2eeB6zqbA0g3WTmG0jAeg6FWKGnQqLy', NULL, NULL),
(4, '0', 'test003@gmail.com', '$2a$10$wjbzm5R8jO0/uLQXIchvle3DkVR8Kbrx0K9y1T5HoIvafzxgAPu2.', NULL, NULL),
(5, '0', 'test004@gmail.com', '$2a$10$eM0l9m364x6Qnu4fyv82VO/MZeTw9gjq8M6ZdOGVpbsdMVk9.d9Si', NULL, NULL),
(6, '0', 'test005@gmail.com', '$2a$10$jDR1drtCw5ppsIEdQCjpuOlt1m/ezmCxV.SoL8jVTpokCHw9aDtvO', NULL, NULL),
(7, '0', 'test006@gmail.com', '$2a$10$pgzPgCUnVxtZ0O.md2IODOu26z76.vtNWHlD.8tA5/FQYv4Q7tNha', NULL, NULL),
(8, '0', 'test007@gmail.com', '$2a$10$bw/8l2YMKjp30cwfD.tUG.ZSREN8AqFi6g.HVdCkm30.JkUXZOsOS', NULL, NULL),
(9, '0', 'test008@gmail.com', '$2a$10$brCvCPXqDf5alt77itcZ7uGSyW9QvWZIWnWx6Zlq6BgBbBsDzxuha', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRlc3QwMDhAZ21haWwuY29tIiwiaWF0IjoxNjQ2NDAyNDk2LCJleHAiOjE2NDY0MDk2OTZ9.rlZomY-i7hwsx_FnWhHyGjIZhuWiQrjEdcejX9tqJrM', NULL),
(10, '0', 'test009@gmail.com', '$2a$10$Y.zFg.ZAXro.F9bVdlr9wuH6CRSidefarva7kCjPRi5QHq72mdgwy', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRlc3QwMDlAZ21haWwuY29tIiwiaWF0IjoxNjQ2NDAyNTU4LCJleHAiOjE2NDY0MDk3NTh9.7sUZ05GbIXVzckN_OwI087fgB5jXsUpHkhsHrH3txto', NULL),
(12, '0', 'test010@gmail.com', '$2a$10$iQe8BVMo2pM4BZUg33qcy.EQgfcErCzJp.UoUmy9tZ69ic9bg/5Ye', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRlc3QwMTBAZ21haWwuY29tIiwiaWF0IjoxNjQ2NDAyNzU4LCJleHAiOjE2NDY0MDk5NTh9.57NeJdJPdKJVu-d5_hlGrEQz9N6aQyI5IrJTGC9C3MU', NULL),
(13, '0', 'test011@gmail.com', '$2a$10$T0PrKan7f5S86bgXZ37MteSGuL1xaSnAeuieU13Y4uQIA/NHB8pWe', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRlc3QwMTFAZ21haWwuY29tIiwiaWF0IjoxNjQ2NDAyOTI2LCJleHAiOjE2NDY0MTAxMjZ9.MD4i10k0nvfzmxG2hNmh17zi5vFsmhXgjFBkuxPF4Go', NULL),
(26, '0', 'test012@gmail.com', '$2a$10$Vzn6eA.bR48IXcaW33lqQeES1jFZ./OJv//oHgXhGOJCDwovdELUm', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRlc3QwMTJAZ21haWwuY29tIiwiaWF0IjoxNjQ2NDE0NjUwLCJleHAiOjE2NDY0MjE4NTB9.jrmxC9iNEznY38QuLzJytq-ONKi8Y600qml3mmtZh7k', NULL),
(37, '0', 'test013@gmail.com', '$2a$10$SV842p1Chd2za3TjbK9pnONUp8ZYdfGM/ISSS7yZ.dKlMH4E4EFL6', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRlc3QwMTNAZ21haWwuY29tIiwiaWF0IjoxNjQ2NDE1MTM2LCJleHAiOjE2NDY0MjIzMzZ9.CJcREp-6loxuVVptBGo2EiuwbO_q7n84LrAa_5EiR3k', NULL),
(39, '0', 'test014@gmail.com', '$2a$10$HPYOtPBn7k7W1M.SK7cheO7m.Tsvty82BnzrN6JsDYVae8rKmWwyu', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRlc3QwMTRAZ21haWwuY29tIiwiaWF0IjoxNjQ2NDgxODY4LCJleHAiOjE2NDY0ODkwNjh9.zLVvlBgIR_ZXTex-2EFJEzNvLUetIkHbU-L6l8cBYtQ', NULL),
(40, '0', 'test015@gmail.com', '$2a$10$zHh.fqmcelMWMxgdSK8BOekSVyPuHO8mKFcUfwCVws/jMj1AxDfHS', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRlc3QwMTVAZ21haWwuY29tIiwiaWF0IjoxNjQ2NDk0ODY4LCJleHAiOjE2NDY1MDIwNjh9.d-xMLmm__gP_92IYy44IBlObCK104KL2XzxW7HIrg8w', NULL),
(42, '0', 'test016@gmail.com', '$2a$12$dDxQdoJS7LRc00qg6WrE1OmQPKhoe4lil2Ndu/eC2Qxv7dH63SXu6', NULL, NULL),
(44, 'test016', 'test017@gmail.com', '$2a$12$c23wZu5sFfQ0hwalr9sKmuQAhWaPUIvkgJb/HxyZumjsoVx/N1oHO', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjQ0LCJuYW1lIjoidGVzdDAxNiIsImlhdCI6MTY0NjkyODk5NjQ2NCwiZXhwIjoxNjQ2OTI5MDAwMDY0fQ.W_pK-pNM5TZ-T8mqfIw9wuqUfB_Uc6cdA3laytd-7P0', NULL),
(45, 'test018', 'test018@gmail.com', '$2a$12$9PVpsv/Oervh6J/onWCWqeWVWANBrIUa4GzGd2.LzM3MW2tgDGacG', NULL, NULL),
(46, 'test019', 'test019@gmail.com', '$2a$12$azUDB.DQ2/Ezi8krekwgsevD/OQl/jDpJ5XY7Bil8jtrPwFVE53R.', NULL, NULL),
(47, 'test020', 'test020@gmail.com', '$2a$12$7iVv51ipVQSeRz.ZaGab.eBrHMOFGk3LIPGrrYJ1LpvuyIhnEgH6e', NULL, NULL),
(48, '', '', '', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjQ0LCJuYW1lIjoidGVzdDAxNiIsImlhdCI6MTY0Njg0NTIyMzk4NiwiZXhwIjoxNjQ2ODQ1MjI3NTg2fQ.3AaJ31Y5ZkYSxr_UM_WoloTqW-0uppaubeERC4kWudk', NULL);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `esp32`
--
ALTER TABLE `esp32`
  ADD PRIMARY KEY (`hsId`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`user_id`,`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `esp32`
--
ALTER TABLE `esp32`
  MODIFY `hsId` int(12) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `user_id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=49;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
