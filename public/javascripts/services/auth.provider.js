angular.module('websiteApp')
.factory('authProvider', ['$window',
   function($window) {
    var _setUser = function(username, cookie) {
        $window.localStorage.setItem('user', username);
        $window.localStorage.setItem('user', cookie);
    };

    var _getUser = function() {
        var user = $window.localStorage.getItem('user');
        var cookie = $window.localStorage.getItem('cookie');
        return { user: user, cookie: cookie };
    }

    var _logout = function() {
        $window.localStorage.removeItem('user');
        $window.localStorage.removeItem('cookie');
    }

    return {
        setUser: _setUser,
        getUser: _getUser,
        logout: _logout
    };
}]);