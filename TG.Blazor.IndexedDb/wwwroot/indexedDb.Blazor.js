/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./client/InitialiseIndexDbBlazor.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./client/InitialiseIndexDbBlazor.ts":
/*!*******************************************!*\
  !*** ./client/InitialiseIndexDbBlazor.ts ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const indexedDbBlazor_1 = __webpack_require__(/*! ./indexedDbBlazor */ "./client/indexedDbBlazor.ts");
var IndexDb;
(function (IndexDb) {
    const timeghostExtensions = 'TimeGhost';
    const extensionObject = {
        IndexedDbManager: new indexedDbBlazor_1.IndexedDbManager()
    };
    function initialise() {
        if (typeof window !== 'undefined' && !window[timeghostExtensions]) {
            window[timeghostExtensions] = Object.assign({}, extensionObject);
        }
        else {
            window[timeghostExtensions] = Object.assign(Object.assign({}, window[timeghostExtensions]), extensionObject);
        }
    }
    IndexDb.initialise = initialise;
})(IndexDb || (IndexDb = {}));
IndexDb.initialise();


/***/ }),

/***/ "./client/indexedDbBlazor.ts":
/*!***********************************!*\
  !*** ./client/indexedDbBlazor.ts ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.IndexedDbManager = void 0;
const idb_1 = __webpack_require__(/*! ../node_modules/idb/lib/idb */ "./node_modules/idb/lib/idb.js");
class IndexedDbManager {
    constructor() {
        this.dbInstance = undefined;
        this.dotnetCallback = (message) => { };
        this.openDb = (data, instanceWrapper) => __awaiter(this, void 0, void 0, function* () {
            const dbStore = data;
            this.dotnetCallback = (message) => {
                instanceWrapper.instance.invokeMethodAsync(instanceWrapper.methodName, message);
            };
            try {
                if (!this.dbInstance || this.dbInstance.version < dbStore.version) {
                    if (this.dbInstance) {
                        this.dbInstance.close();
                    }
                    this.dbInstance = yield idb_1.default.open(dbStore.dbName, dbStore.version, upgradeDB => {
                        this.upgradeDatabase(upgradeDB, dbStore);
                    });
                }
            }
            catch (e) {
                this.dbInstance = yield idb_1.default.open(dbStore.dbName);
            }
            return `IndexedDB ${data.dbName} opened`;
        });
        this.getDbInfo = (dbName) => __awaiter(this, void 0, void 0, function* () {
            if (!this.dbInstance) {
                this.dbInstance = yield idb_1.default.open(dbName);
            }
            const currentDb = this.dbInstance;
            let getStoreNames = (list) => {
                let names = [];
                for (var i = 0; i < list.length; i++) {
                    names.push(list[i]);
                }
                return names;
            };
            const dbInfo = {
                version: currentDb.version,
                storeNames: getStoreNames(currentDb.objectStoreNames)
            };
            return dbInfo;
        });
        this.deleteDb = (dbName) => __awaiter(this, void 0, void 0, function* () {
            this.dbInstance.close();
            yield idb_1.default.delete(dbName);
            this.dbInstance = undefined;
            return `The database ${dbName} has been deleted`;
        });
        this.addRecord = (record) => __awaiter(this, void 0, void 0, function* () {
            const stName = record.storename;
            let itemToSave = record.data;
            const tx = this.getTransaction(this.dbInstance, stName, 'readwrite');
            const objectStore = tx.objectStore(stName);
            itemToSave = this.checkForKeyPath(objectStore, itemToSave);
            const result = yield objectStore.add(itemToSave, record.key);
            return `Added new record with id ${result}`;
        });
        this.updateRecord = (record) => __awaiter(this, void 0, void 0, function* () {
            const stName = record.storename;
            const tx = this.getTransaction(this.dbInstance, stName, 'readwrite');
            const result = yield tx.objectStore(stName).put(record.data, record.key);
            return `updated record with id ${result}`;
        });
        this.getRecords = (storeName) => __awaiter(this, void 0, void 0, function* () {
            const tx = this.getTransaction(this.dbInstance, storeName, 'readonly');
            let results = yield tx.objectStore(storeName).getAll();
            yield tx.complete;
            return results;
        });
        this.clearStore = (storeName) => __awaiter(this, void 0, void 0, function* () {
            const tx = this.getTransaction(this.dbInstance, storeName, 'readwrite');
            yield tx.objectStore(storeName).clear();
            yield tx.complete;
            return `Store ${storeName} cleared`;
        });
        this.countAll = (storeName) => __awaiter(this, void 0, void 0, function* () {
            const tx = this.getTransaction(this.dbInstance, storeName, 'readwrite');
            var result = yield tx.objectStore(storeName).count();
            yield tx.complete;
            return result;
        });
        this.countByRange = (storename, range) => __awaiter(this, void 0, void 0, function* () {
            var range2 = IDBKeyRange.bound(range.lower, range.upper, range.lowerOpen, range.upperOpen);
            const tx = this.getTransaction(this.dbInstance, storename, 'readwrite');
            var result = yield tx.objectStore(storename).count(range2);
            yield tx.complete;
            return result;
        });
        this.getRecordByIndex = (searchData) => __awaiter(this, void 0, void 0, function* () {
            const tx = this.getTransaction(this.dbInstance, searchData.storename, 'readonly');
            const results = yield tx.objectStore(searchData.storename)
                .index(searchData.indexName)
                .get(searchData.queryValue);
            yield tx.complete;
            return results;
        });
        this.getAllRecordsByIndex = (searchData) => __awaiter(this, void 0, void 0, function* () {
            const tx = this.getTransaction(this.dbInstance, searchData.storename, 'readonly');
            let results = [];
            tx.objectStore(searchData.storename)
                .index(searchData.indexName)
                .iterateCursor(cursor => {
                if (!cursor) {
                    return;
                }
                if (cursor.key === searchData.queryValue) {
                    results.push(cursor.value);
                }
                cursor.continue();
            });
            yield tx.complete;
            return results;
        });
        this.getAllRecordsByIndexEx = (searchData, range) => __awaiter(this, void 0, void 0, function* () {
            var range2 = IDBKeyRange.bound(range.lower, range.upper, range.lowerOpen, range.upperOpen);
            const tx = this.getTransaction(this.dbInstance, searchData.storename, 'readonly');
            let results = [];
            tx.objectStore(searchData.storename)
                .index(searchData.indexName)
                .iterateCursor(range2, cursor => {
                if (!cursor) {
                    return;
                }
                results.push(cursor.value);
                cursor.continue();
            });
            yield tx.complete;
            return results;
        });
        this.getRecordById = (storename, id) => __awaiter(this, void 0, void 0, function* () {
            const tx = this.getTransaction(this.dbInstance, storename, 'readonly');
            let result = yield tx.objectStore(storename).get(id);
            return result;
        });
        this.deleteRecord = (storename, id) => __awaiter(this, void 0, void 0, function* () {
            const tx = this.getTransaction(this.dbInstance, storename, 'readwrite');
            yield tx.objectStore(storename).delete(id);
            return `Record with id: ${id} deleted`;
        });
    }
    getTransaction(dbInstance, stName, mode) {
        const tx = dbInstance.transaction(stName, mode);
        tx.complete.catch(err => {
            if (err) {
                console.error(err.message);
            }
            else {
                console.error('Undefined error in getTransaction()');
            }
        });
        return tx;
    }
    checkForKeyPath(objectStore, data) {
        if (!objectStore.autoIncrement || !objectStore.keyPath) {
            return data;
        }
        if (typeof objectStore.keyPath !== 'string') {
            return data;
        }
        const keyPath = objectStore.keyPath;
        if (!data[keyPath]) {
            delete data[keyPath];
        }
        return data;
    }
    upgradeDatabase(upgradeDB, dbStore) {
        if (upgradeDB.oldVersion < dbStore.version) {
            if (dbStore.stores) {
                for (var store of dbStore.stores) {
                    if (!upgradeDB.objectStoreNames.contains(store.name)) {
                        this.addNewStore(upgradeDB, store);
                        this.dotnetCallback(`store added ${store.name}: db version: ${dbStore.version}`);
                    }
                }
            }
        }
    }
    addNewStore(upgradeDB, store) {
        let primaryKey = store.primaryKey;
        if (!primaryKey) {
            primaryKey = { name: 'id', keyPath: 'id', auto: true };
        }
        const newStore = upgradeDB.createObjectStore(store.name, { keyPath: primaryKey.keyPath, autoIncrement: primaryKey.auto });
        for (var index of store.indexes) {
            newStore.createIndex(index.name, index.compound ? index.keyPaths : index.keyPath, { unique: index.unique, multiEntry: index.multiEntry });
        }
    }
}
exports.IndexedDbManager = IndexedDbManager;


/***/ }),

/***/ "./node_modules/idb/lib/idb.js":
/*!*************************************!*\
  !*** ./node_modules/idb/lib/idb.js ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


(function() {
  function toArray(arr) {
    return Array.prototype.slice.call(arr);
  }

  function promisifyRequest(request) {
    return new Promise(function(resolve, reject) {
      request.onsuccess = function() {
        resolve(request.result);
      };

      request.onerror = function() {
        reject(request.error);
      };
    });
  }

  function promisifyRequestCall(obj, method, args) {
    var request;
    var p = new Promise(function(resolve, reject) {
      request = obj[method].apply(obj, args);
      promisifyRequest(request).then(resolve, reject);
    });

    p.request = request;
    return p;
  }

  function promisifyCursorRequestCall(obj, method, args) {
    var p = promisifyRequestCall(obj, method, args);
    return p.then(function(value) {
      if (!value) return;
      return new Cursor(value, p.request);
    });
  }

  function proxyProperties(ProxyClass, targetProp, properties) {
    properties.forEach(function(prop) {
      Object.defineProperty(ProxyClass.prototype, prop, {
        get: function() {
          return this[targetProp][prop];
        },
        set: function(val) {
          this[targetProp][prop] = val;
        }
      });
    });
  }

  function proxyRequestMethods(ProxyClass, targetProp, Constructor, properties) {
    properties.forEach(function(prop) {
      if (!(prop in Constructor.prototype)) return;
      ProxyClass.prototype[prop] = function() {
        return promisifyRequestCall(this[targetProp], prop, arguments);
      };
    });
  }

  function proxyMethods(ProxyClass, targetProp, Constructor, properties) {
    properties.forEach(function(prop) {
      if (!(prop in Constructor.prototype)) return;
      ProxyClass.prototype[prop] = function() {
        return this[targetProp][prop].apply(this[targetProp], arguments);
      };
    });
  }

  function proxyCursorRequestMethods(ProxyClass, targetProp, Constructor, properties) {
    properties.forEach(function(prop) {
      if (!(prop in Constructor.prototype)) return;
      ProxyClass.prototype[prop] = function() {
        return promisifyCursorRequestCall(this[targetProp], prop, arguments);
      };
    });
  }

  function Index(index) {
    this._index = index;
  }

  proxyProperties(Index, '_index', [
    'name',
    'keyPath',
    'multiEntry',
    'unique'
  ]);

  proxyRequestMethods(Index, '_index', IDBIndex, [
    'get',
    'getKey',
    'getAll',
    'getAllKeys',
    'count'
  ]);

  proxyCursorRequestMethods(Index, '_index', IDBIndex, [
    'openCursor',
    'openKeyCursor'
  ]);

  function Cursor(cursor, request) {
    this._cursor = cursor;
    this._request = request;
  }

  proxyProperties(Cursor, '_cursor', [
    'direction',
    'key',
    'primaryKey',
    'value'
  ]);

  proxyRequestMethods(Cursor, '_cursor', IDBCursor, [
    'update',
    'delete'
  ]);

  // proxy 'next' methods
  ['advance', 'continue', 'continuePrimaryKey'].forEach(function(methodName) {
    if (!(methodName in IDBCursor.prototype)) return;
    Cursor.prototype[methodName] = function() {
      var cursor = this;
      var args = arguments;
      return Promise.resolve().then(function() {
        cursor._cursor[methodName].apply(cursor._cursor, args);
        return promisifyRequest(cursor._request).then(function(value) {
          if (!value) return;
          return new Cursor(value, cursor._request);
        });
      });
    };
  });

  function ObjectStore(store) {
    this._store = store;
  }

  ObjectStore.prototype.createIndex = function() {
    return new Index(this._store.createIndex.apply(this._store, arguments));
  };

  ObjectStore.prototype.index = function() {
    return new Index(this._store.index.apply(this._store, arguments));
  };

  proxyProperties(ObjectStore, '_store', [
    'name',
    'keyPath',
    'indexNames',
    'autoIncrement'
  ]);

  proxyRequestMethods(ObjectStore, '_store', IDBObjectStore, [
    'put',
    'add',
    'delete',
    'clear',
    'get',
    'getAll',
    'getKey',
    'getAllKeys',
    'count'
  ]);

  proxyCursorRequestMethods(ObjectStore, '_store', IDBObjectStore, [
    'openCursor',
    'openKeyCursor'
  ]);

  proxyMethods(ObjectStore, '_store', IDBObjectStore, [
    'deleteIndex'
  ]);

  function Transaction(idbTransaction) {
    this._tx = idbTransaction;
    this.complete = new Promise(function(resolve, reject) {
      idbTransaction.oncomplete = function() {
        resolve();
      };
      idbTransaction.onerror = function() {
        reject(idbTransaction.error);
      };
      idbTransaction.onabort = function() {
        reject(idbTransaction.error);
      };
    });
  }

  Transaction.prototype.objectStore = function() {
    return new ObjectStore(this._tx.objectStore.apply(this._tx, arguments));
  };

  proxyProperties(Transaction, '_tx', [
    'objectStoreNames',
    'mode'
  ]);

  proxyMethods(Transaction, '_tx', IDBTransaction, [
    'abort'
  ]);

  function UpgradeDB(db, oldVersion, transaction) {
    this._db = db;
    this.oldVersion = oldVersion;
    this.transaction = new Transaction(transaction);
  }

  UpgradeDB.prototype.createObjectStore = function() {
    return new ObjectStore(this._db.createObjectStore.apply(this._db, arguments));
  };

  proxyProperties(UpgradeDB, '_db', [
    'name',
    'version',
    'objectStoreNames'
  ]);

  proxyMethods(UpgradeDB, '_db', IDBDatabase, [
    'deleteObjectStore',
    'close'
  ]);

  function DB(db) {
    this._db = db;
  }

  DB.prototype.transaction = function() {
    return new Transaction(this._db.transaction.apply(this._db, arguments));
  };

  proxyProperties(DB, '_db', [
    'name',
    'version',
    'objectStoreNames'
  ]);

  proxyMethods(DB, '_db', IDBDatabase, [
    'close'
  ]);

  // Add cursor iterators
  // TODO: remove this once browsers do the right thing with promises
  ['openCursor', 'openKeyCursor'].forEach(function(funcName) {
    [ObjectStore, Index].forEach(function(Constructor) {
      // Don't create iterateKeyCursor if openKeyCursor doesn't exist.
      if (!(funcName in Constructor.prototype)) return;

      Constructor.prototype[funcName.replace('open', 'iterate')] = function() {
        var args = toArray(arguments);
        var callback = args[args.length - 1];
        var nativeObject = this._store || this._index;
        var request = nativeObject[funcName].apply(nativeObject, args.slice(0, -1));
        request.onsuccess = function() {
          callback(request.result);
        };
      };
    });
  });

  // polyfill getAll
  [Index, ObjectStore].forEach(function(Constructor) {
    if (Constructor.prototype.getAll) return;
    Constructor.prototype.getAll = function(query, count) {
      var instance = this;
      var items = [];

      return new Promise(function(resolve) {
        instance.iterateCursor(query, function(cursor) {
          if (!cursor) {
            resolve(items);
            return;
          }
          items.push(cursor.value);

          if (count !== undefined && items.length == count) {
            resolve(items);
            return;
          }
          cursor.continue();
        });
      });
    };
  });

  var exp = {
    open: function(name, version, upgradeCallback) {
      var p = promisifyRequestCall(indexedDB, 'open', [name, version]);
      var request = p.request;

      if (request) {
        request.onupgradeneeded = function(event) {
          if (upgradeCallback) {
            upgradeCallback(new UpgradeDB(request.result, event.oldVersion, request.transaction));
          }
        };
      }

      return p.then(function(db) {
        return new DB(db);
      });
    },
    delete: function(name) {
      return promisifyRequestCall(indexedDB, 'deleteDatabase', [name]);
    }
  };

  if (true) {
    module.exports = exp;
    module.exports.default = module.exports;
  }
  else {}
}());


/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vY2xpZW50L0luaXRpYWxpc2VJbmRleERiQmxhem9yLnRzIiwid2VicGFjazovLy8uL2NsaWVudC9pbmRleGVkRGJCbGF6b3IudHMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2lkYi9saWIvaWRiLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7UUFBQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTs7O1FBR0E7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLDBDQUEwQyxnQ0FBZ0M7UUFDMUU7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSx3REFBd0Qsa0JBQWtCO1FBQzFFO1FBQ0EsaURBQWlELGNBQWM7UUFDL0Q7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBLHlDQUF5QyxpQ0FBaUM7UUFDMUUsZ0hBQWdILG1CQUFtQixFQUFFO1FBQ3JJO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0EsMkJBQTJCLDBCQUEwQixFQUFFO1FBQ3ZELGlDQUFpQyxlQUFlO1FBQ2hEO1FBQ0E7UUFDQTs7UUFFQTtRQUNBLHNEQUFzRCwrREFBK0Q7O1FBRXJIO1FBQ0E7OztRQUdBO1FBQ0E7Ozs7Ozs7Ozs7Ozs7OztBQ2xGQSxzR0FBcUQ7QUFFckQsSUFBVSxPQUFPLENBbUJoQjtBQW5CRCxXQUFVLE9BQU87SUFDYixNQUFNLG1CQUFtQixHQUFXLFdBQVcsQ0FBQztJQUNoRCxNQUFNLGVBQWUsR0FBRztRQUNwQixnQkFBZ0IsRUFBRSxJQUFJLGtDQUFnQixFQUFFO0tBQzNDLENBQUM7SUFFRixTQUFnQixVQUFVO1FBQ3RCLElBQUksT0FBTyxNQUFNLEtBQUssV0FB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QTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNULE9BQU87QUFDUDtBQUNBLEdBQUc7O0FBRUg7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMLEdBQUc7O0FBRUg7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1QsT0FBTztBQUNQO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsT0FBTztBQUNQLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxNQUFNLElBQTZCO0FBQ25DO0FBQ0E7QUFDQTtBQUNBLE9BQU8sRUFFSjtBQUNILENBQUMiLCJmaWxlIjoiaW5kZXhlZERiLkJsYXpvci5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGdldHRlciB9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcbiBcdFx0fVxuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gY3JlYXRlIGEgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0XG4gXHQvLyBtb2RlICYgMTogdmFsdWUgaXMgYSBtb2R1bGUgaWQsIHJlcXVpcmUgaXRcbiBcdC8vIG1vZGUgJiAyOiBtZXJnZSBhbGwgcHJvcGVydGllcyBvZiB2YWx1ZSBpbnRvIHRoZSBuc1xuIFx0Ly8gbW9kZSAmIDQ6IHJldHVybiB2YWx1ZSB3aGVuIGFscmVhZHkgbnMgb2JqZWN0XG4gXHQvLyBtb2RlICYgOHwxOiBiZWhhdmUgbGlrZSByZXF1aXJlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRpZihtb2RlICYgMSkgdmFsdWUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKHZhbHVlKTtcbiBcdFx0aWYobW9kZSAmIDgpIHJldHVybiB2YWx1ZTtcbiBcdFx0aWYoKG1vZGUgJiA0KSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlICYmIHZhbHVlLl9fZXNNb2R1bGUpIHJldHVybiB2YWx1ZTtcbiBcdFx0dmFyIG5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yKG5zKTtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG5zLCAnZGVmYXVsdCcsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHZhbHVlIH0pO1xuIFx0XHRpZihtb2RlICYgMiAmJiB0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIGZvcih2YXIga2V5IGluIHZhbHVlKSBfX3dlYnBhY2tfcmVxdWlyZV9fLmQobnMsIGtleSwgZnVuY3Rpb24oa2V5KSB7IHJldHVybiB2YWx1ZVtrZXldOyB9LmJpbmQobnVsbCwga2V5KSk7XG4gXHRcdHJldHVybiBucztcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSBcIi4vY2xpZW50L0luaXRpYWxpc2VJbmRleERiQmxhem9yLnRzXCIpO1xuIiwiaW1wb3J0IHsgSW5kZXhlZERiTWFuYWdlciB9IGZyb20gJy4vaW5kZXhlZERiQmxhem9yJztcclxuXHJcbm5hbWVzcGFjZSBJbmRleERiIHtcclxuICAgIGNvbnN0IHRpbWVnaG9zdEV4dGVuc2lvbnM6IHN0cmluZyA9ICdUaW1lR2hvc3QnO1xyXG4gICAgY29uc3QgZXh0ZW5zaW9uT2JqZWN0ID0ge1xyXG4gICAgICAgIEluZGV4ZWREYk1hbmFnZXI6IG5ldyBJbmRleGVkRGJNYW5hZ2VyKClcclxuICAgIH07XHJcblxyXG4gICAgZXhwb3J0IGZ1bmN0aW9uIGluaXRpYWxpc2UoKTogdm9pZCB7XHJcbiAgICAgICAgaWYgKHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnICYmICF3aW5kb3dbdGltZWdob3N0RXh0ZW5zaW9uc10pIHtcclxuICAgICAgICAgICAgd2luZG93W3RpbWVnaG9zdEV4dGVuc2lvbnNdID0ge1xyXG4gICAgICAgICAgICAgICAgLi4uZXh0ZW5zaW9uT2JqZWN0XHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgd2luZG93W3RpbWVnaG9zdEV4dGVuc2lvbnNdID0ge1xyXG4gICAgICAgICAgICAgICAgLi4ud2luZG93W3RpbWVnaG9zdEV4dGVuc2lvbnNdLFxyXG4gICAgICAgICAgICAgICAgLi4uZXh0ZW5zaW9uT2JqZWN0XHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgfVxyXG5cclxuICAgIH1cclxufVxyXG5cclxuSW5kZXhEYi5pbml0aWFsaXNlKCk7IiwiLy8vLy8gPHJlZmVyZW5jZSBwYXRoPVwiTWljcm9zb2Z0LkpTSW50ZXJvcC5kLnRzXCIvPlxyXG5pbXBvcnQgaWRiIGZyb20gJy4uL25vZGVfbW9kdWxlcy9pZGIvbGliL2lkYic7XHJcbmltcG9ydCB7IERCLCBVcGdyYWRlREIsIE9iamVjdFN0b3JlLCBUcmFuc2FjdGlvbiB9IGZyb20gJy4uL25vZGVfbW9kdWxlcy9pZGIvbGliL2lkYic7XHJcbmltcG9ydCB7IElEYlN0b3JlLCBJSW5kZXhTZWFyY2gsIElJbmRleFNwZWMsIElTdG9yZVJlY29yZCwgSVN0b3JlU2NoZW1hLCBJRG90TmV0SW5zdGFuY2VXcmFwcGVyLCBJRGJJbmZvcm1hdGlvbiB9IGZyb20gJy4vSW50ZXJvcEludGVyZmFjZXMnO1xyXG5cclxuZXhwb3J0IGNsYXNzIEluZGV4ZWREYk1hbmFnZXIge1xyXG5cclxuICAgIHByaXZhdGUgZGJJbnN0YW5jZTphbnkgPSB1bmRlZmluZWQ7XHJcbiAgICBwcml2YXRlIGRvdG5ldENhbGxiYWNrID0gKG1lc3NhZ2U6IHN0cmluZykgPT4geyB9O1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKCkgeyB9XHJcblxyXG4gICAgcHVibGljIG9wZW5EYiA9IGFzeW5jIChkYXRhOiBJRGJTdG9yZSwgaW5zdGFuY2VXcmFwcGVyOiBJRG90TmV0SW5zdGFuY2VXcmFwcGVyKTogUHJvbWlzZTxzdHJpbmc+ID0+IHtcclxuICAgICAgICBjb25zdCBkYlN0b3JlID0gZGF0YTtcclxuICAgICAgICAvL2p1c3QgYSB0ZXN0IGZvciB0aGUgbW9tZW50XHJcbiAgICAgICAgdGhpcy5kb3RuZXRDYWxsYmFjayA9IChtZXNzYWdlOiBzdHJpbmcpID0+IHtcclxuICAgICAgICAgICAgaW5zdGFuY2VXcmFwcGVyLmluc3RhbmNlLmludm9rZU1ldGhvZEFzeW5jKGluc3RhbmNlV3JhcHBlci5tZXRob2ROYW1lLCBtZXNzYWdlKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgIGlmICghdGhpcy5kYkluc3RhbmNlIHx8IHRoaXMuZGJJbnN0YW5jZS52ZXJzaW9uIDwgZGJTdG9yZS52ZXJzaW9uKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5kYkluc3RhbmNlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5kYkluc3RhbmNlLmNsb3NlKCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB0aGlzLmRiSW5zdGFuY2UgPSBhd2FpdCBpZGIub3BlbihkYlN0b3JlLmRiTmFtZSwgZGJTdG9yZS52ZXJzaW9uLCB1cGdyYWRlREIgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMudXBncmFkZURhdGFiYXNlKHVwZ3JhZGVEQiwgZGJTdG9yZSk7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0gY2F0Y2ggKGUpIHtcclxuICAgICAgICAgICAgdGhpcy5kYkluc3RhbmNlID0gYXdhaXQgaWRiLm9wZW4oZGJTdG9yZS5kYk5hbWUpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBcclxuICAgICAgICByZXR1cm4gYEluZGV4ZWREQiAke2RhdGEuZGJOYW1lfSBvcGVuZWRgO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBnZXREYkluZm8gPSBhc3luYyAoZGJOYW1lOiBzdHJpbmcpIDogUHJvbWlzZTxJRGJJbmZvcm1hdGlvbj4gPT4ge1xyXG4gICAgICAgIGlmICghdGhpcy5kYkluc3RhbmNlKSB7XHJcbiAgICAgICAgICAgIHRoaXMuZGJJbnN0YW5jZSA9IGF3YWl0IGlkYi5vcGVuKGRiTmFtZSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBjb25zdCBjdXJyZW50RGIgPSA8REI+dGhpcy5kYkluc3RhbmNlO1xyXG5cclxuICAgICAgICBsZXQgZ2V0U3RvcmVOYW1lcyA9IChsaXN0OiBET01TdHJpbmdMaXN0KTogc3RyaW5nW10gPT4ge1xyXG4gICAgICAgICAgICBsZXQgbmFtZXM6IHN0cmluZ1tdID0gW107XHJcbiAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbGlzdC5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgbmFtZXMucHVzaChsaXN0W2ldKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gbmFtZXM7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNvbnN0IGRiSW5mbzogSURiSW5mb3JtYXRpb24gPSB7XHJcbiAgICAgICAgICAgIHZlcnNpb246IGN1cnJlbnREYi52ZXJzaW9uLFxyXG4gICAgICAgICAgICBzdG9yZU5hbWVzOiBnZXRTdG9yZU5hbWVzKGN1cnJlbnREYi5vYmplY3RTdG9yZU5hbWVzKVxyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIHJldHVybiBkYkluZm87XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGRlbGV0ZURiID0gYXN5bmMoZGJOYW1lOiBzdHJpbmcpOiBQcm9taXNlPHN0cmluZz4gPT4ge1xyXG4gICAgICAgIHRoaXMuZGJJbnN0YW5jZS5jbG9zZSgpO1xyXG5cclxuICAgICAgICBhd2FpdCBpZGIuZGVsZXRlKGRiTmFtZSk7XHJcblxyXG4gICAgICAgIHRoaXMuZGJJbnN0YW5jZSA9IHVuZGVmaW5lZDtcclxuXHJcbiAgICAgICAgcmV0dXJuIGBUaGUgZGF0YWJhc2UgJHtkYk5hbWV9IGhhcyBiZWVuIGRlbGV0ZWRgO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBhZGRSZWNvcmQgPSBhc3luYyAocmVjb3JkOiBJU3RvcmVSZWNvcmQpOiBQcm9taXNlPHN0cmluZz4gPT4ge1xyXG4gICAgICAgIGNvbnN0IHN0TmFtZSA9IHJlY29yZC5zdG9yZW5hbWU7XHJcbiAgICAgICAgbGV0IGl0ZW1Ub1NhdmUgPSByZWNvcmQuZGF0YTtcclxuICAgICAgICBjb25zdCB0eCA9IHRoaXMuZ2V0VHJhbnNhY3Rpb24odGhpcy5kYkluc3RhbmNlLCBzdE5hbWUsICdyZWFkd3JpdGUnKTtcclxuICAgICAgICBjb25zdCBvYmplY3RTdG9yZSA9IHR4Lm9iamVjdFN0b3JlKHN0TmFtZSk7XHJcblxyXG4gICAgICAgIGl0ZW1Ub1NhdmUgPSB0aGlzLmNoZWNrRm9yS2V5UGF0aChvYmplY3RTdG9yZSwgaXRlbVRvU2F2ZSk7XHJcblxyXG4gICAgICAgIGNvbnN0IHJlc3VsdCA9IGF3YWl0IG9iamVjdFN0b3JlLmFkZChpdGVtVG9TYXZlLCByZWNvcmQua2V5KTtcclxuXHJcbiAgICAgICAgcmV0dXJuIGBBZGRlZCBuZXcgcmVjb3JkIHdpdGggaWQgJHtyZXN1bHR9YDtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgdXBkYXRlUmVjb3JkID0gYXN5bmMgKHJlY29yZDogSVN0b3JlUmVjb3JkKTogUHJvbWlzZTxzdHJpbmc+ID0+IHtcclxuICAgICAgICBjb25zdCBzdE5hbWUgPSByZWNvcmQuc3RvcmVuYW1lO1xyXG4gICAgICAgIGNvbnN0IHR4ID0gdGhpcy5nZXRUcmFuc2FjdGlvbih0aGlzLmRiSW5zdGFuY2UsIHN0TmFtZSwgJ3JlYWR3cml0ZScpO1xyXG5cclxuICAgICAgICBjb25zdCByZXN1bHQgPSBhd2FpdCB0eC5vYmplY3RTdG9yZShzdE5hbWUpLnB1dChyZWNvcmQuZGF0YSwgcmVjb3JkLmtleSk7XHJcbiAgICAgICBcclxuICAgICAgICByZXR1cm4gYHVwZGF0ZWQgcmVjb3JkIHdpdGggaWQgJHtyZXN1bHR9YDtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0UmVjb3JkcyA9IGFzeW5jIChzdG9yZU5hbWU6IHN0cmluZyk6IFByb21pc2U8YW55PiA9PiB7XHJcbiAgICAgICAgY29uc3QgdHggPSB0aGlzLmdldFRyYW5zYWN0aW9uKHRoaXMuZGJJbnN0YW5jZSwgc3RvcmVOYW1lLCAncmVhZG9ubHknKTtcclxuXHJcbiAgICAgICAgbGV0IHJlc3VsdHMgPSBhd2FpdCB0eC5vYmplY3RTdG9yZShzdG9yZU5hbWUpLmdldEFsbCgpO1xyXG5cclxuICAgICAgICBhd2FpdCB0eC5jb21wbGV0ZTtcclxuXHJcbiAgICAgICAgcmV0dXJuIHJlc3VsdHM7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGNsZWFyU3RvcmUgPSBhc3luYyAoc3RvcmVOYW1lOiBzdHJpbmcpOiBQcm9taXNlPHN0cmluZz4gPT4ge1xyXG4gICAgICAgIFxyXG4gICAgICAgIGNvbnN0IHR4ID0gdGhpcy5nZXRUcmFuc2FjdGlvbih0aGlzLmRiSW5zdGFuY2UsIHN0b3JlTmFtZSwgJ3JlYWR3cml0ZScpO1xyXG5cclxuICAgICAgICBhd2FpdCB0eC5vYmplY3RTdG9yZShzdG9yZU5hbWUpLmNsZWFyKCk7XHJcbiAgICAgICAgYXdhaXQgdHguY29tcGxldGU7XHJcblxyXG4gICAgICAgIHJldHVybiBgU3RvcmUgJHtzdG9yZU5hbWV9IGNsZWFyZWRgO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBjb3VudEFsbCA9IGFzeW5jIChzdG9yZU5hbWU6IHN0cmluZyk6IFByb21pc2U8bnVtYmVyPiA9PiB7XHJcblxyXG4gICAgICAgIGNvbnN0IHR4ID0gdGhpcy5nZXRUcmFuc2FjdGlvbih0aGlzLmRiSW5zdGFuY2UsIHN0b3JlTmFtZSwgJ3JlYWR3cml0ZScpO1xyXG5cclxuICAgICAgICB2YXIgcmVzdWx0ID0gYXdhaXQgdHgub2JqZWN0U3RvcmUoc3RvcmVOYW1lKS5jb3VudCgpO1xyXG4gICAgICAgIGF3YWl0IHR4LmNvbXBsZXRlO1xyXG5cclxuICAgICAgICByZXR1cm4gcmVzdWx0O1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBjb3VudEJ5UmFuZ2UgPSBhc3luYyAoc3RvcmVuYW1lOiBzdHJpbmcscmFuZ2U6IElEQktleVJhbmdlKTogUHJvbWlzZTxudW1iZXI+ID0+IHtcclxuICAgICAgICB2YXIgcmFuZ2UyID0gSURCS2V5UmFuZ2UuYm91bmQocmFuZ2UubG93ZXIsIHJhbmdlLnVwcGVyLCByYW5nZS5sb3dlck9wZW4sIHJhbmdlLnVwcGVyT3Blbik7XHJcblxyXG4gICAgICAgIGNvbnN0IHR4ID0gdGhpcy5nZXRUcmFuc2FjdGlvbih0aGlzLmRiSW5zdGFuY2UsIHN0b3JlbmFtZSwgJ3JlYWR3cml0ZScpO1xyXG5cclxuICAgICAgICB2YXIgcmVzdWx0ID0gYXdhaXQgdHgub2JqZWN0U3RvcmUoc3RvcmVuYW1lKS5jb3VudChyYW5nZTIpO1xyXG4gICAgICAgIGF3YWl0IHR4LmNvbXBsZXRlO1xyXG5cclxuICAgICAgICByZXR1cm4gcmVzdWx0O1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBnZXRSZWNvcmRCeUluZGV4ID0gYXN5bmMgKHNlYXJjaERhdGE6IElJbmRleFNlYXJjaCk6IFByb21pc2U8YW55PiA9PiB7XHJcbiAgICAgICAgY29uc3QgdHggPSB0aGlzLmdldFRyYW5zYWN0aW9uKHRoaXMuZGJJbnN0YW5jZSwgc2VhcmNoRGF0YS5zdG9yZW5hbWUsICdyZWFkb25seScpO1xyXG4gICAgICAgIGNvbnN0IHJlc3VsdHMgPSBhd2FpdCB0eC5vYmplY3RTdG9yZShzZWFyY2hEYXRhLnN0b3JlbmFtZSlcclxuICAgICAgICAgICAgLmluZGV4KHNlYXJjaERhdGEuaW5kZXhOYW1lKVxyXG4gICAgICAgICAgICAuZ2V0KHNlYXJjaERhdGEucXVlcnlWYWx1ZSk7XHJcblxyXG4gICAgICAgIGF3YWl0IHR4LmNvbXBsZXRlO1xyXG4gICAgICAgIHJldHVybiByZXN1bHRzO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBnZXRBbGxSZWNvcmRzQnlJbmRleCA9IGFzeW5jIChzZWFyY2hEYXRhOiBJSW5kZXhTZWFyY2gpOiBQcm9taXNlPGFueT4gPT4ge1xyXG4gICAgICAgIGNvbnN0IHR4ID0gdGhpcy5nZXRUcmFuc2FjdGlvbih0aGlzLmRiSW5zdGFuY2UsIHNlYXJjaERhdGEuc3RvcmVuYW1lLCAncmVhZG9ubHknKTtcclxuICAgICAgICBsZXQgcmVzdWx0czogYW55W10gPSBbXTtcclxuXHJcbiAgICAgICAgdHgub2JqZWN0U3RvcmUoc2VhcmNoRGF0YS5zdG9yZW5hbWUpXHJcbiAgICAgICAgICAgIC5pbmRleChzZWFyY2hEYXRhLmluZGV4TmFtZSlcclxuICAgICAgICAgICAgLml0ZXJhdGVDdXJzb3IoY3Vyc29yID0+IHtcclxuICAgICAgICAgICAgICAgIGlmICghY3Vyc29yKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIGlmIChjdXJzb3Iua2V5ID09PSBzZWFyY2hEYXRhLnF1ZXJ5VmFsdWUpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXN1bHRzLnB1c2goY3Vyc29yLnZhbHVlKTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBjdXJzb3IuY29udGludWUoKTtcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGF3YWl0IHR4LmNvbXBsZXRlO1xyXG5cclxuICAgICAgICByZXR1cm4gcmVzdWx0cztcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0QWxsUmVjb3Jkc0J5SW5kZXhFeCA9IGFzeW5jIChzZWFyY2hEYXRhOiBJSW5kZXhTZWFyY2gsIHJhbmdlOiBJREJLZXlSYW5nZSk6IFByb21pc2U8YW55PiA9PiB7XHJcbiAgICAgICAgdmFyIHJhbmdlMiA9IElEQktleVJhbmdlLmJvdW5kKHJhbmdlLmxvd2VyLCByYW5nZS51cHBlciwgcmFuZ2UubG93ZXJPcGVuLCByYW5nZS51cHBlck9wZW4pO1xyXG5cclxuICAgICAgICBjb25zdCB0eCA9IHRoaXMuZ2V0VHJhbnNhY3Rpb24odGhpcy5kYkluc3RhbmNlLCBzZWFyY2hEYXRhLnN0b3JlbmFtZSwgJ3JlYWRvbmx5Jyk7XHJcbiAgICAgICAgbGV0IHJlc3VsdHM6IGFueVtdID0gW107XHJcblxyXG4gICAgICAgIHR4Lm9iamVjdFN0b3JlKHNlYXJjaERhdGEuc3RvcmVuYW1lKVxyXG4gICAgICAgICAgICAuaW5kZXgoc2VhcmNoRGF0YS5pbmRleE5hbWUpXHJcbiAgICAgICAgICAgIC5pdGVyYXRlQ3Vyc29yKHJhbmdlMixjdXJzb3IgPT4ge1xyXG4gICAgICAgICAgICAgICAgaWYgKCFjdXJzb3IpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICByZXN1bHRzLnB1c2goY3Vyc29yLnZhbHVlKTtcclxuICAgICAgICAgICAgICAgIC8qXHJcbiAgICAgICAgICAgICAgICBpZiAoY3Vyc29yLmtleSA9PT0gc2VhcmNoRGF0YS5xdWVyeVZhbHVlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAqL1xyXG4gICAgICAgICAgICAgICAgY3Vyc29yLmNvbnRpbnVlKCk7XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICBhd2FpdCB0eC5jb21wbGV0ZTtcclxuXHJcbiAgICAgICAgcmV0dXJuIHJlc3VsdHM7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGdldFJlY29yZEJ5SWQgPSBhc3luYyAoc3RvcmVuYW1lOiBzdHJpbmcsIGlkOiBhbnkpOiBQcm9taXNlPGFueT4gPT4ge1xyXG5cclxuICAgICAgICBjb25zdCB0eCA9IHRoaXMuZ2V0VHJhbnNhY3Rpb24odGhpcy5kYkluc3RhbmNlLCBzdG9yZW5hbWUsICdyZWFkb25seScpO1xyXG5cclxuICAgICAgICBsZXQgcmVzdWx0ID0gYXdhaXQgdHgub2JqZWN0U3RvcmUoc3RvcmVuYW1lKS5nZXQoaWQpO1xyXG4gICAgICAgIHJldHVybiByZXN1bHQ7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGRlbGV0ZVJlY29yZCA9IGFzeW5jIChzdG9yZW5hbWU6IHN0cmluZywgaWQ6IGFueSk6IFByb21pc2U8c3RyaW5nPiA9PiB7XHJcbiAgICAgICAgY29uc3QgdHggPSB0aGlzLmdldFRyYW5zYWN0aW9uKHRoaXMuZGJJbnN0YW5jZSwgc3RvcmVuYW1lLCAncmVhZHdyaXRlJyk7XHJcblxyXG4gICAgICAgIGF3YWl0IHR4Lm9iamVjdFN0b3JlKHN0b3JlbmFtZSkuZGVsZXRlKGlkKTtcclxuXHJcbiAgICAgICAgcmV0dXJuIGBSZWNvcmQgd2l0aCBpZDogJHtpZH0gZGVsZXRlZGA7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBnZXRUcmFuc2FjdGlvbihkYkluc3RhbmNlOiBEQiwgc3ROYW1lOiBzdHJpbmcsIG1vZGU/OiAncmVhZG9ubHknIHwgJ3JlYWR3cml0ZScpIHtcclxuICAgICAgICBjb25zdCB0eCA9IGRiSW5zdGFuY2UudHJhbnNhY3Rpb24oc3ROYW1lLCBtb2RlKTtcclxuICAgICAgICB0eC5jb21wbGV0ZS5jYXRjaChcclxuICAgICAgICAgICAgZXJyID0+IHtcclxuICAgICAgICAgICAgICAgIGlmIChlcnIpIHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKChlcnIgYXMgRXJyb3IpLm1lc3NhZ2UpO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKCdVbmRlZmluZWQgZXJyb3IgaW4gZ2V0VHJhbnNhY3Rpb24oKScpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICByZXR1cm4gdHg7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gQ3VycmVudGx5IGRvbid0IHN1cHBvcnQgYWdncmVnYXRlIGtleXNcclxuICAgIHByaXZhdGUgY2hlY2tGb3JLZXlQYXRoKG9iamVjdFN0b3JlOiBPYmplY3RTdG9yZTxhbnksIGFueT4sIGRhdGE6IGFueSkge1xyXG4gICAgICAgIGlmICghb2JqZWN0U3RvcmUuYXV0b0luY3JlbWVudCB8fCAhb2JqZWN0U3RvcmUua2V5UGF0aCkge1xyXG4gICAgICAgICAgICByZXR1cm4gZGF0YTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmICh0eXBlb2Ygb2JqZWN0U3RvcmUua2V5UGF0aCAhPT0gJ3N0cmluZycpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGRhdGE7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBjb25zdCBrZXlQYXRoID0gb2JqZWN0U3RvcmUua2V5UGF0aCBhcyBzdHJpbmc7XHJcblxyXG4gICAgICAgIGlmICghZGF0YVtrZXlQYXRoXSkge1xyXG4gICAgICAgICAgICBkZWxldGUgZGF0YVtrZXlQYXRoXTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGRhdGE7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSB1cGdyYWRlRGF0YWJhc2UodXBncmFkZURCOiBVcGdyYWRlREIsIGRiU3RvcmU6IElEYlN0b3JlKSB7XHJcbiAgICAgICAgaWYgKHVwZ3JhZGVEQi5vbGRWZXJzaW9uIDwgZGJTdG9yZS52ZXJzaW9uKSB7XHJcbiAgICAgICAgICAgIGlmIChkYlN0b3JlLnN0b3Jlcykge1xyXG4gICAgICAgICAgICAgICAgZm9yICh2YXIgc3RvcmUgb2YgZGJTdG9yZS5zdG9yZXMpIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoIXVwZ3JhZGVEQi5vYmplY3RTdG9yZU5hbWVzLmNvbnRhaW5zKHN0b3JlLm5hbWUpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuYWRkTmV3U3RvcmUodXBncmFkZURCLCBzdG9yZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZG90bmV0Q2FsbGJhY2soYHN0b3JlIGFkZGVkICR7c3RvcmUubmFtZX06IGRiIHZlcnNpb246ICR7ZGJTdG9yZS52ZXJzaW9ufWApO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGFkZE5ld1N0b3JlKHVwZ3JhZGVEQjogVXBncmFkZURCLCBzdG9yZTogSVN0b3JlU2NoZW1hKSB7XHJcbiAgICAgICAgbGV0IHByaW1hcnlLZXkgPSBzdG9yZS5wcmltYXJ5S2V5O1xyXG5cclxuICAgICAgICBpZiAoIXByaW1hcnlLZXkpIHtcclxuICAgICAgICAgICAgcHJpbWFyeUtleSA9IHsgbmFtZTogJ2lkJywga2V5UGF0aDogJ2lkJywgYXV0bzogdHJ1ZX07XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBjb25zdCBuZXdTdG9yZSA9IHVwZ3JhZGVEQi5jcmVhdGVPYmplY3RTdG9yZShzdG9yZS5uYW1lLCB7IGtleVBhdGg6IHByaW1hcnlLZXkua2V5UGF0aCwgYXV0b0luY3JlbWVudDogcHJpbWFyeUtleS5hdXRvIH0pO1xyXG5cclxuICAgICAgICBmb3IgKHZhciBpbmRleCBvZiBzdG9yZS5pbmRleGVzKSB7XHJcbiAgICAgICAgICAgIC8vY29uc29sZS5sb2coXCJuZXdTdG9yZS5jcmVhdGVJbmRleCBcIiArIGluZGV4Lm5hbWUpO1xyXG4gICAgICAgICAgICBuZXdTdG9yZS5jcmVhdGVJbmRleChpbmRleC5uYW1lLCBpbmRleC5jb21wb3VuZCA/IGluZGV4LmtleVBhdGhzISA6IGluZGV4LmtleVBhdGgsIHsgdW5pcXVlOiBpbmRleC51bmlxdWUsIG11bHRpRW50cnk6IGluZGV4Lm11bHRpRW50cnkgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59IiwiJ3VzZSBzdHJpY3QnO1xuXG4oZnVuY3Rpb24oKSB7XG4gIGZ1bmN0aW9uIHRvQXJyYXkoYXJyKSB7XG4gICAgcmV0dXJuIEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGFycik7XG4gIH1cblxuICBmdW5jdGlvbiBwcm9taXNpZnlSZXF1ZXN0KHJlcXVlc3QpIHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24ocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICByZXF1ZXN0Lm9uc3VjY2VzcyA9IGZ1bmN0aW9uKCkge1xuICAgICAgICByZXNvbHZlKHJlcXVlc3QucmVzdWx0KTtcbiAgICAgIH07XG5cbiAgICAgIHJlcXVlc3Qub25lcnJvciA9IGZ1bmN0aW9uKCkge1xuICAgICAgICByZWplY3QocmVxdWVzdC5lcnJvcik7XG4gICAgICB9O1xuICAgIH0pO1xuICB9XG5cbiAgZnVuY3Rpb24gcHJvbWlzaWZ5UmVxdWVzdENhbGwob2JqLCBtZXRob2QsIGFyZ3MpIHtcbiAgICB2YXIgcmVxdWVzdDtcbiAgICB2YXIgcCA9IG5ldyBQcm9taXNlKGZ1bmN0aW9uKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgcmVxdWVzdCA9IG9ialttZXRob2RdLmFwcGx5KG9iaiwgYXJncyk7XG4gICAgICBwcm9taXNpZnlSZXF1ZXN0KHJlcXVlc3QpLnRoZW4ocmVzb2x2ZSwgcmVqZWN0KTtcbiAgICB9KTtcblxuICAgIHAucmVxdWVzdCA9IHJlcXVlc3Q7XG4gICAgcmV0dXJuIHA7XG4gIH1cblxuICBmdW5jdGlvbiBwcm9taXNpZnlDdXJzb3JSZXF1ZXN0Q2FsbChvYmosIG1ldGhvZCwgYXJncykge1xuICAgIHZhciBwID0gcHJvbWlzaWZ5UmVxdWVzdENhbGwob2JqLCBtZXRob2QsIGFyZ3MpO1xuICAgIHJldHVybiBwLnRoZW4oZnVuY3Rpb24odmFsdWUpIHtcbiAgICAgIGlmICghdmFsdWUpIHJldHVybjtcbiAgICAgIHJldHVybiBuZXcgQ3Vyc29yKHZhbHVlLCBwLnJlcXVlc3QpO1xuICAgIH0pO1xuICB9XG5cbiAgZnVuY3Rpb24gcHJveHlQcm9wZXJ0aWVzKFByb3h5Q2xhc3MsIHRhcmdldFByb3AsIHByb3BlcnRpZXMpIHtcbiAgICBwcm9wZXJ0aWVzLmZvckVhY2goZnVuY3Rpb24ocHJvcCkge1xuICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KFByb3h5Q2xhc3MucHJvdG90eXBlLCBwcm9wLCB7XG4gICAgICAgIGdldDogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgcmV0dXJuIHRoaXNbdGFyZ2V0UHJvcF1bcHJvcF07XG4gICAgICAgIH0sXG4gICAgICAgIHNldDogZnVuY3Rpb24odmFsKSB7XG4gICAgICAgICAgdGhpc1t0YXJnZXRQcm9wXVtwcm9wXSA9IHZhbDtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfSk7XG4gIH1cblxuICBmdW5jdGlvbiBwcm94eVJlcXVlc3RNZXRob2RzKFByb3h5Q2xhc3MsIHRhcmdldFByb3AsIENvbnN0cnVjdG9yLCBwcm9wZXJ0aWVzKSB7XG4gICAgcHJvcGVydGllcy5mb3JFYWNoKGZ1bmN0aW9uKHByb3ApIHtcbiAgICAgIGlmICghKHByb3AgaW4gQ29uc3RydWN0b3IucHJvdG90eXBlKSkgcmV0dXJuO1xuICAgICAgUHJveHlDbGFzcy5wcm90b3R5cGVbcHJvcF0gPSBmdW5jdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIHByb21pc2lmeVJlcXVlc3RDYWxsKHRoaXNbdGFyZ2V0UHJvcF0sIHByb3AsIGFyZ3VtZW50cyk7XG4gICAgICB9O1xuICAgIH0pO1xuICB9XG5cbiAgZnVuY3Rpb24gcHJveHlNZXRob2RzKFByb3h5Q2xhc3MsIHRhcmdldFByb3AsIENvbnN0cnVjdG9yLCBwcm9wZXJ0aWVzKSB7XG4gICAgcHJvcGVydGllcy5mb3JFYWNoKGZ1bmN0aW9uKHByb3ApIHtcbiAgICAgIGlmICghKHByb3AgaW4gQ29uc3RydWN0b3IucHJvdG90eXBlKSkgcmV0dXJuO1xuICAgICAgUHJveHlDbGFzcy5wcm90b3R5cGVbcHJvcF0gPSBmdW5jdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIHRoaXNbdGFyZ2V0UHJvcF1bcHJvcF0uYXBwbHkodGhpc1t0YXJnZXRQcm9wXSwgYXJndW1lbnRzKTtcbiAgICAgIH07XG4gICAgfSk7XG4gIH1cblxuICBmdW5jdGlvbiBwcm94eUN1cnNvclJlcXVlc3RNZXRob2RzKFByb3h5Q2xhc3MsIHRhcmdldFByb3AsIENvbnN0cnVjdG9yLCBwcm9wZXJ0aWVzKSB7XG4gICAgcHJvcGVydGllcy5mb3JFYWNoKGZ1bmN0aW9uKHByb3ApIHtcbiAgICAgIGlmICghKHByb3AgaW4gQ29uc3RydWN0b3IucHJvdG90eXBlKSkgcmV0dXJuO1xuICAgICAgUHJveHlDbGFzcy5wcm90b3R5cGVbcHJvcF0gPSBmdW5jdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIHByb21pc2lmeUN1cnNvclJlcXVlc3RDYWxsKHRoaXNbdGFyZ2V0UHJvcF0sIHByb3AsIGFyZ3VtZW50cyk7XG4gICAgICB9O1xuICAgIH0pO1xuICB9XG5cbiAgZnVuY3Rpb24gSW5kZXgoaW5kZXgpIHtcbiAgICB0aGlzLl9pbmRleCA9IGluZGV4O1xuICB9XG5cbiAgcHJveHlQcm9wZXJ0aWVzKEluZGV4LCAnX2luZGV4JywgW1xuICAgICduYW1lJyxcbiAgICAna2V5UGF0aCcsXG4gICAgJ211bHRpRW50cnknLFxuICAgICd1bmlxdWUnXG4gIF0pO1xuXG4gIHByb3h5UmVxdWVzdE1ldGhvZHMoSW5kZXgsICdfaW5kZXgnLCBJREJJbmRleCwgW1xuICAgICdnZXQnLFxuICAgICdnZXRLZXknLFxuICAgICdnZXRBbGwnLFxuICAgICdnZXRBbGxLZXlzJyxcbiAgICAnY291bnQnXG4gIF0pO1xuXG4gIHByb3h5Q3Vyc29yUmVxdWVzdE1ldGhvZHMoSW5kZXgsICdfaW5kZXgnLCBJREJJbmRleCwgW1xuICAgICdvcGVuQ3Vyc29yJyxcbiAgICAnb3BlbktleUN1cnNvcidcbiAgXSk7XG5cbiAgZnVuY3Rpb24gQ3Vyc29yKGN1cnNvciwgcmVxdWVzdCkge1xuICAgIHRoaXMuX2N1cnNvciA9IGN1cnNvcjtcbiAgICB0aGlzLl9yZXF1ZXN0ID0gcmVxdWVzdDtcbiAgfVxuXG4gIHByb3h5UHJvcGVydGllcyhDdXJzb3IsICdfY3Vyc29yJywgW1xuICAgICdkaXJlY3Rpb24nLFxuICAgICdrZXknLFxuICAgICdwcmltYXJ5S2V5JyxcbiAgICAndmFsdWUnXG4gIF0pO1xuXG4gIHByb3h5UmVxdWVzdE1ldGhvZHMoQ3Vyc29yLCAnX2N1cnNvcicsIElEQkN1cnNvciwgW1xuICAgICd1cGRhdGUnLFxuICAgICdkZWxldGUnXG4gIF0pO1xuXG4gIC8vIHByb3h5ICduZXh0JyBtZXRob2RzXG4gIFsnYWR2YW5jZScsICdjb250aW51ZScsICdjb250aW51ZVByaW1hcnlLZXknXS5mb3JFYWNoKGZ1bmN0aW9uKG1ldGhvZE5hbWUpIHtcbiAgICBpZiAoIShtZXRob2ROYW1lIGluIElEQkN1cnNvci5wcm90b3R5cGUpKSByZXR1cm47XG4gICAgQ3Vyc29yLnByb3RvdHlwZVttZXRob2ROYW1lXSA9IGZ1bmN0aW9uKCkge1xuICAgICAgdmFyIGN1cnNvciA9IHRoaXM7XG4gICAgICB2YXIgYXJncyA9IGFyZ3VtZW50cztcbiAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoKS50aGVuKGZ1bmN0aW9uKCkge1xuICAgICAgICBjdXJzb3IuX2N1cnNvclttZXRob2ROYW1lXS5hcHBseShjdXJzb3IuX2N1cnNvciwgYXJncyk7XG4gICAgICAgIHJldHVybiBwcm9taXNpZnlSZXF1ZXN0KGN1cnNvci5fcmVxdWVzdCkudGhlbihmdW5jdGlvbih2YWx1ZSkge1xuICAgICAgICAgIGlmICghdmFsdWUpIHJldHVybjtcbiAgICAgICAgICByZXR1cm4gbmV3IEN1cnNvcih2YWx1ZSwgY3Vyc29yLl9yZXF1ZXN0KTtcbiAgICAgICAgfSk7XG4gICAgICB9KTtcbiAgICB9O1xuICB9KTtcblxuICBmdW5jdGlvbiBPYmplY3RTdG9yZShzdG9yZSkge1xuICAgIHRoaXMuX3N0b3JlID0gc3RvcmU7XG4gIH1cblxuICBPYmplY3RTdG9yZS5wcm90b3R5cGUuY3JlYXRlSW5kZXggPSBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gbmV3IEluZGV4KHRoaXMuX3N0b3JlLmNyZWF0ZUluZGV4LmFwcGx5KHRoaXMuX3N0b3JlLCBhcmd1bWVudHMpKTtcbiAgfTtcblxuICBPYmplY3RTdG9yZS5wcm90b3R5cGUuaW5kZXggPSBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gbmV3IEluZGV4KHRoaXMuX3N0b3JlLmluZGV4LmFwcGx5KHRoaXMuX3N0b3JlLCBhcmd1bWVudHMpKTtcbiAgfTtcblxuICBwcm94eVByb3BlcnRpZXMoT2JqZWN0U3RvcmUsICdfc3RvcmUnLCBbXG4gICAgJ25hbWUnLFxuICAgICdrZXlQYXRoJyxcbiAgICAnaW5kZXhOYW1lcycsXG4gICAgJ2F1dG9JbmNyZW1lbnQnXG4gIF0pO1xuXG4gIHByb3h5UmVxdWVzdE1ldGhvZHMoT2JqZWN0U3RvcmUsICdfc3RvcmUnLCBJREJPYmplY3RTdG9yZSwgW1xuICAgICdwdXQnLFxuICAgICdhZGQnLFxuICAgICdkZWxldGUnLFxuICAgICdjbGVhcicsXG4gICAgJ2dldCcsXG4gICAgJ2dldEFsbCcsXG4gICAgJ2dldEtleScsXG4gICAgJ2dldEFsbEtleXMnLFxuICAgICdjb3VudCdcbiAgXSk7XG5cbiAgcHJveHlDdXJzb3JSZXF1ZXN0TWV0aG9kcyhPYmplY3RTdG9yZSwgJ19zdG9yZScsIElEQk9iamVjdFN0b3JlLCBbXG4gICAgJ29wZW5DdXJzb3InLFxuICAgICdvcGVuS2V5Q3Vyc29yJ1xuICBdKTtcblxuICBwcm94eU1ldGhvZHMoT2JqZWN0U3RvcmUsICdfc3RvcmUnLCBJREJPYmplY3RTdG9yZSwgW1xuICAgICdkZWxldGVJbmRleCdcbiAgXSk7XG5cbiAgZnVuY3Rpb24gVHJhbnNhY3Rpb24oaWRiVHJhbnNhY3Rpb24pIHtcbiAgICB0aGlzLl90eCA9IGlkYlRyYW5zYWN0aW9uO1xuICAgIHRoaXMuY29tcGxldGUgPSBuZXcgUHJvbWlzZShmdW5jdGlvbihyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgIGlkYlRyYW5zYWN0aW9uLm9uY29tcGxldGUgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgcmVzb2x2ZSgpO1xuICAgICAgfTtcbiAgICAgIGlkYlRyYW5zYWN0aW9uLm9uZXJyb3IgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgcmVqZWN0KGlkYlRyYW5zYWN0aW9uLmVycm9yKTtcbiAgICAgIH07XG4gICAgICBpZGJUcmFuc2FjdGlvbi5vbmFib3J0ID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIHJlamVjdChpZGJUcmFuc2FjdGlvbi5lcnJvcik7XG4gICAgICB9O1xuICAgIH0pO1xuICB9XG5cbiAgVHJhbnNhY3Rpb24ucHJvdG90eXBlLm9iamVjdFN0b3JlID0gZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIG5ldyBPYmplY3RTdG9yZSh0aGlzLl90eC5vYmplY3RTdG9yZS5hcHBseSh0aGlzLl90eCwgYXJndW1lbnRzKSk7XG4gIH07XG5cbiAgcHJveHlQcm9wZXJ0aWVzKFRyYW5zYWN0aW9uLCAnX3R4JywgW1xuICAgICdvYmplY3RTdG9yZU5hbWVzJyxcbiAgICAnbW9kZSdcbiAgXSk7XG5cbiAgcHJveHlNZXRob2RzKFRyYW5zYWN0aW9uLCAnX3R4JywgSURCVHJhbnNhY3Rpb24sIFtcbiAgICAnYWJvcnQnXG4gIF0pO1xuXG4gIGZ1bmN0aW9uIFVwZ3JhZGVEQihkYiwgb2xkVmVyc2lvbiwgdHJhbnNhY3Rpb24pIHtcbiAgICB0aGlzLl9kYiA9IGRiO1xuICAgIHRoaXMub2xkVmVyc2lvbiA9IG9sZFZlcnNpb247XG4gICAgdGhpcy50cmFuc2FjdGlvbiA9IG5ldyBUcmFuc2FjdGlvbih0cmFuc2FjdGlvbik7XG4gIH1cblxuICBVcGdyYWRlREIucHJvdG90eXBlLmNyZWF0ZU9iamVjdFN0b3JlID0gZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIG5ldyBPYmplY3RTdG9yZSh0aGlzLl9kYi5jcmVhdGVPYmplY3RTdG9yZS5hcHBseSh0aGlzLl9kYiwgYXJndW1lbnRzKSk7XG4gIH07XG5cbiAgcHJveHlQcm9wZXJ0aWVzKFVwZ3JhZGVEQiwgJ19kYicsIFtcbiAgICAnbmFtZScsXG4gICAgJ3ZlcnNpb24nLFxuICAgICdvYmplY3RTdG9yZU5hbWVzJ1xuICBdKTtcblxuICBwcm94eU1ldGhvZHMoVXBncmFkZURCLCAnX2RiJywgSURCRGF0YWJhc2UsIFtcbiAgICAnZGVsZXRlT2JqZWN0U3RvcmUnLFxuICAgICdjbG9zZSdcbiAgXSk7XG5cbiAgZnVuY3Rpb24gREIoZGIpIHtcbiAgICB0aGlzLl9kYiA9IGRiO1xuICB9XG5cbiAgREIucHJvdG90eXBlLnRyYW5zYWN0aW9uID0gZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIG5ldyBUcmFuc2FjdGlvbih0aGlzLl9kYi50cmFuc2FjdGlvbi5hcHBseSh0aGlzLl9kYiwgYXJndW1lbnRzKSk7XG4gIH07XG5cbiAgcHJveHlQcm9wZXJ0aWVzKERCLCAnX2RiJywgW1xuICAgICduYW1lJyxcbiAgICAndmVyc2lvbicsXG4gICAgJ29iamVjdFN0b3JlTmFtZXMnXG4gIF0pO1xuXG4gIHByb3h5TWV0aG9kcyhEQiwgJ19kYicsIElEQkRhdGFiYXNlLCBbXG4gICAgJ2Nsb3NlJ1xuICBdKTtcblxuICAvLyBBZGQgY3Vyc29yIGl0ZXJhdG9yc1xuICAvLyBUT0RPOiByZW1vdmUgdGhpcyBvbmNlIGJyb3dzZXJzIGRvIHRoZSByaWdodCB0aGluZyB3aXRoIHByb21pc2VzXG4gIFsnb3BlbkN1cnNvcicsICdvcGVuS2V5Q3Vyc29yJ10uZm9yRWFjaChmdW5jdGlvbihmdW5jTmFtZSkge1xuICAgIFtPYmplY3RTdG9yZSwgSW5kZXhdLmZvckVhY2goZnVuY3Rpb24oQ29uc3RydWN0b3IpIHtcbiAgICAgIC8vIERvbid0IGNyZWF0ZSBpdGVyYXRlS2V5Q3Vyc29yIGlmIG9wZW5LZXlDdXJzb3IgZG9lc24ndCBleGlzdC5cbiAgICAgIGlmICghKGZ1bmNOYW1lIGluIENvbnN0cnVjdG9yLnByb3RvdHlwZSkpIHJldHVybjtcblxuICAgICAgQ29uc3RydWN0b3IucHJvdG90eXBlW2Z1bmNOYW1lLnJlcGxhY2UoJ29wZW4nLCAnaXRlcmF0ZScpXSA9IGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgYXJncyA9IHRvQXJyYXkoYXJndW1lbnRzKTtcbiAgICAgICAgdmFyIGNhbGxiYWNrID0gYXJnc1thcmdzLmxlbmd0aCAtIDFdO1xuICAgICAgICB2YXIgbmF0aXZlT2JqZWN0ID0gdGhpcy5fc3RvcmUgfHwgdGhpcy5faW5kZXg7XG4gICAgICAgIHZhciByZXF1ZXN0ID0gbmF0aXZlT2JqZWN0W2Z1bmNOYW1lXS5hcHBseShuYXRpdmVPYmplY3QsIGFyZ3Muc2xpY2UoMCwgLTEpKTtcbiAgICAgICAgcmVxdWVzdC5vbnN1Y2Nlc3MgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICBjYWxsYmFjayhyZXF1ZXN0LnJlc3VsdCk7XG4gICAgICAgIH07XG4gICAgICB9O1xuICAgIH0pO1xuICB9KTtcblxuICAvLyBwb2x5ZmlsbCBnZXRBbGxcbiAgW0luZGV4LCBPYmplY3RTdG9yZV0uZm9yRWFjaChmdW5jdGlvbihDb25zdHJ1Y3Rvcikge1xuICAgIGlmIChDb25zdHJ1Y3Rvci5wcm90b3R5cGUuZ2V0QWxsKSByZXR1cm47XG4gICAgQ29uc3RydWN0b3IucHJvdG90eXBlLmdldEFsbCA9IGZ1bmN0aW9uKHF1ZXJ5LCBjb3VudCkge1xuICAgICAgdmFyIGluc3RhbmNlID0gdGhpcztcbiAgICAgIHZhciBpdGVtcyA9IFtdO1xuXG4gICAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24ocmVzb2x2ZSkge1xuICAgICAgICBpbnN0YW5jZS5pdGVyYXRlQ3Vyc29yKHF1ZXJ5LCBmdW5jdGlvbihjdXJzb3IpIHtcbiAgICAgICAgICBpZiAoIWN1cnNvcikge1xuICAgICAgICAgICAgcmVzb2x2ZShpdGVtcyk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgfVxuICAgICAgICAgIGl0ZW1zLnB1c2goY3Vyc29yLnZhbHVlKTtcblxuICAgICAgICAgIGlmIChjb3VudCAhPT0gdW5kZWZpbmVkICYmIGl0ZW1zLmxlbmd0aCA9PSBjb3VudCkge1xuICAgICAgICAgICAgcmVzb2x2ZShpdGVtcyk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgfVxuICAgICAgICAgIGN1cnNvci5jb250aW51ZSgpO1xuICAgICAgICB9KTtcbiAgICAgIH0pO1xuICAgIH07XG4gIH0pO1xuXG4gIHZhciBleHAgPSB7XG4gICAgb3BlbjogZnVuY3Rpb24obmFtZSwgdmVyc2lvbiwgdXBncmFkZUNhbGxiYWNrKSB7XG4gICAgICB2YXIgcCA9IHByb21pc2lmeVJlcXVlc3RDYWxsKGluZGV4ZWREQiwgJ29wZW4nLCBbbmFtZSwgdmVyc2lvbl0pO1xuICAgICAgdmFyIHJlcXVlc3QgPSBwLnJlcXVlc3Q7XG5cbiAgICAgIGlmIChyZXF1ZXN0KSB7XG4gICAgICAgIHJlcXVlc3Qub251cGdyYWRlbmVlZGVkID0gZnVuY3Rpb24oZXZlbnQpIHtcbiAgICAgICAgICBpZiAodXBncmFkZUNhbGxiYWNrKSB7XG4gICAgICAgICAgICB1cGdyYWRlQ2FsbGJhY2sobmV3IFVwZ3JhZGVEQihyZXF1ZXN0LnJlc3VsdCwgZXZlbnQub2xkVmVyc2lvbiwgcmVxdWVzdC50cmFuc2FjdGlvbikpO1xuICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHAudGhlbihmdW5jdGlvbihkYikge1xuICAgICAgICByZXR1cm4gbmV3IERCKGRiKTtcbiAgICAgIH0pO1xuICAgIH0sXG4gICAgZGVsZXRlOiBmdW5jdGlvbihuYW1lKSB7XG4gICAgICByZXR1cm4gcHJvbWlzaWZ5UmVxdWVzdENhbGwoaW5kZXhlZERCLCAnZGVsZXRlRGF0YWJhc2UnLCBbbmFtZV0pO1xuICAgIH1cbiAgfTtcblxuICBpZiAodHlwZW9mIG1vZHVsZSAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICBtb2R1bGUuZXhwb3J0cyA9IGV4cDtcbiAgICBtb2R1bGUuZXhwb3J0cy5kZWZhdWx0ID0gbW9kdWxlLmV4cG9ydHM7XG4gIH1cbiAgZWxzZSB7XG4gICAgc2VsZi5pZGIgPSBleHA7XG4gIH1cbn0oKSk7XG4iXSwic291cmNlUm9vdCI6IiJ9