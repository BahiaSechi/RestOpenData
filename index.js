const sqlite = require('sqlite3');
const express = require('express');

let db = new sqlite.Database('./sqlite.db');
