angular.module('commonModule')

// SEO Meta Data
    .value('DEFAULT_TITLE', 'South Coast Swords')

    .config([
        '$animateProvider',
        function(
            $animateProvider
        ) {
            // Don't monitor font awesome animation .fa-spin
            $animateProvider.classNameFilter(/^((?!(fa-spin)).)*$/);
        }
    ]);
