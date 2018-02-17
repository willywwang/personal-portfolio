angular.module('websiteApp')
.factory('authProvider', ['$window',
   function($window) {
    var _setUser = function(username, cookie) {
        $window.sessionStorage.setItem('user', username);
        $window.sessionStorage.setItem('cookie', cookie);
    };

    var _getUser = function() {
        var user = $window.sessionStorage.getItem('user');
        var cookie = $window.sessionStorage.getItem('cookie');

        if (!user) {
            user = "";
        }

        if (!cookie) {
            cookie = "";
        }

        return { username: user, cookie: cookie };
    }

    var _logout = function() {
        $window.sessionStorage.removeItem('user');
        $window.sessionStorage.removeItem('cookie');
    }

    return {
        setUser: _setUser,
        getUser: _getUser,
        logout: _logout
    };
}]);