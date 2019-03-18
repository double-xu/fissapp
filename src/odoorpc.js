// https://github.com/akretion/odoo-json-rpc/blob/master/jsonrpc.js
import axios from 'axios';


class Cookies { // cookies doesn't work with Android default browser / Ionic
    session_id = null;

    delete_sessionId() {
        this.session_id = null;
        document.cookie = "session_id=; expires=Wed, 29 Jun 2016 00:00:00 UTC";
    }

    get_sessionId() {
        return document
                .cookie.split("; ")
                .filter(x => { return x.indexOf("session_id") === 0; })
                .map(x => { return x.split("=")[1]; })
                .pop() || this.session_id || "";
    }

    set_sessionId(val) {
        document.cookie = `session_id=${val}`;
        this.session_id = val;
    }
}

class ODOORPC {
  sendRequest = function(url, params) {
    
    var json_data = {
      jsonrpc: '2.0',
      method: 'call',
      params: params,
    };
    // var request = {
    //   'type' : 'POST',
    //   'url' : url,
    //   'data' : JSON.stringify(json_data),
    //   'contentType' : 'application/json',
    //   'id' : 'r' + requestCounts
    // };
    return axios.post(url, json_data, {})
      .then(this.handleOdooErrors)
      .catch(this.handleHttpErrors);
 };

  login = function(db, login, password) {
      let params = {
          db : db,
          login : login,
          password : password
      };
      return this.sendRequest('/web/session/authenticate', params);
  };

  searchRead = function(model, domain, fields) {
      let params = {
          model: model,
          domain: domain,
          fields: fields,
      }
      return this.sendRequest('/web/dataset/search_read', params);
  }

  call = function(model, method, args, kwargs) {
      let params = {
          model: model,
          method: method,
          args: args,
          kwargs: kwargs,
      };
      return this.sendRequest('/web/dataset/call_kw', params);


  }

  handleHttpErrors(error) {
    return Promise.reject(error.message || error);
  }

  handleOdooErrors(response) {

    
    response = response.data;
    // console.log("handleOdooErrors", response);
    if (!response.error) {
        return response.result;
    }

    

    let error = response.error;
    let errorObj = {
        title: "    ",
        message: "",
        fullTrace: error
    };

    if (error.code === 200 && error.message === "Odoo Server Error" && error.data.name === "werkzeug.exceptions.NotFound") {
        errorObj.title = "page_not_found";
        errorObj.message = "HTTP Error";
    } else if ( (error.code === 100 && error.message === "Odoo Session Expired") || // v8
                (error.code === 300 && error.message === "OpenERP WebClient Error" && error.data.debug.match("SessionExpiredException")) // v7
            ) {
                errorObj.title = "session_expired";
                // this.cookies.delete_sessionId();
    } else if ( (error.message === "Odoo Server Error" && /FATAL:  database "(.+)" does not exist/.test(error.data.message))) {
        errorObj.title = "database_not_found";
        errorObj.message = error.data.message;
    } else if ( (error.data.name === "openerp.exceptions.AccessError")) {
        errorObj.title = "AccessError";
        errorObj.message = error.data.message;
    } else {
        let split = ("" + error.data.fault_code).split("\n")[0].split(" -- ");
        if (split.length > 1) {
            error.type = split.shift();
            error.data.fault_code = error.data.fault_code.substr(error.type.length + 4);
        }

        if (error.code === 200 && error.type) {
            errorObj.title = error.type;
            errorObj.message = error.data.fault_code.replace(/\n/g, "<br />");
        } else {
            errorObj.title = error.message;
            errorObj.message = error.data.debug.replace(/\n/g, "<br />");
        }
    }
    // console.log("错误是: ", errorObj);
    return Promise.reject(errorObj.title);
  }
}


export default new ODOORPC();