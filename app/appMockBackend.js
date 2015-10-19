rangoNowApp

    .run(function($httpBackend) {

        $httpBackend.whenGET(/http:\/\/localhost:8080\/*/).passThrough();

        $httpBackend.whenGET(/\//).passThrough();

        $httpBackend.whenGET(/modules\/*/).passThrough();

        $httpBackend.whenGET(/resources\/*/).passThrough();

    });
