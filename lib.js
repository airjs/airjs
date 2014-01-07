require('seajs');
var global = require('./driver/global');
global.lib = global.lib || {};

lib.string = lib.string || {};
lib.array = lib.array || {};
lib.element = lib.element || {};
lib.event = lib.event || {};
lib.fn = lib.fn || {};
lib.json = lib.json || {};
lib.lang = lib.lang || {};
lib.object = lib.object || {};
lib.selector = lib.selector || {};
lib.url = lib.url || {};
lib.http = lib.http || {};
lib.fs = lib.fs || {};
lib.date = lib.date || {};
lib.data = {};
lib.plugins = {};
lib.crypto = {};
lib.ic = {};
lib.async = {};
lib.event = {};


//prototype
require('./platform/prototype/array/forEach');
require('./platform/prototype/string/trim');

//string
lib.string.encodeHtml = require('./platform/string/encodeHtml');
lib.string.decodeHtml = require('./platform/string/decodeHtml');
lib.string.getLength = require('./platform/string/getLength');
lib.string.formatJSON = require('./platform/string/formatJSON');
//array
lib.array.getLen = require('./platform/array/getLen');
lib.array.isArray = require('./platform/array/isArray');
//function
lib.fn.abstractMethod = require('./platform/fn/abstractMethod');
lib.fn.emptyMethod = require('./platform/fn/emptyMethod');
//lang
lib.lang.isSameDomain = require('./platform/lang/isSameDomain');
//object
lib.object.extend = require('./platform/object/extend');
lib.object.deepExtend = require('./platform/object/deepExtend');
lib.object.forEach = require('./platform/object/forEach');
lib.object.isObject = require('./platform/object/isObject');
lib.object.isEmpty = require('./platform/object/isEmpty');
//url
lib.url.parse = require('./platform/url/parse');
lib.url.queryToJson = require('./platform/url/queryToJson');
lib.url.isUrl = require('./platform/url/isUrl');
lib.url.jsonToQuery = require('./platform/url/jsonToQuery');
//http
lib.http.request = require('./platform/http/request');

lib.Class = require('./platform/class');

lib.fs.readFile = require('./platform/fs/readFile');
lib.fs.writeFile = require('./platform/fs/writeFile');
lib.fs.readFileAsync = require('./platform/fs/readFileAsync');
lib.fs.recure = require('./platform/fs/recure');
lib.fs.rm = require('./platform/fs/rm');
lib.fs.mkdir = require('./platform/fs/mkdir');
lib.fs.mvAsync = require('./platform/fs/mvAsync');
lib.fs.cpAsync = require('./platform/fs/cpAsync');
lib.fs.open = require('./platform/fs/open');
lib.fs.close = require('./platform/fs/close');
lib.fs.write = require('./platform/fs/write');
lib.fs.isDirectory = require('./platform/fs/isDirectory');
lib.fs.isFile = require('./platform/fs/isFile');
lib.fs.isExist = require('./platform/fs/isExist');
lib.fs.appendAsync = require('./platform/fs/appendAsync');
lib.fs.readDir = require('./platform/fs/readDir');
lib.fs.size = require('./platform/fs/size');

//date
lib.date.format = require('./platform/date/format');
lib.date.formatSeconds = require('./platform/date/formatSeconds');

//data
lib.data.Tree = require('./platform/data/tree');

//plugins
lib.plugins.Template = require('./platform/plugins/template');
lib.plugins.Mustache = require('./platform/plugins/mustache');
lib.plugins.ArtTemplate = require('./platform/plugins/artTemplate');

//crypto
lib.crypto.md5 = require('./platform/crypto/md5');

//ic
lib.ic.InfoCenter = require('./platform/ic/infoCenter');

//async
lib.async.Queue = require('./platform/async/queue');

//event
lib.event.customEvent = require('./platform/event/customEvent');

module.exports = lib;
