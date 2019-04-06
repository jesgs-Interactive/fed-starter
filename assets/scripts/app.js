(function ($) {
    let APP = {};

    APP.Sticky = {
        init: function () {
            $('.js-sticky').each(function () {
                let $this = $(this);
                let headerBottom = $this.outerHeight();
                let startSticky = 0;

                if ($this.data('elementStart') !== undefined) {
                    let $startElement = ($this.data('elementStart') !== undefined)
                                        ? $($this.data('elementStart')) : null;
                    startSticky = ($startElement.length !== 0) ? $startElement.outerHeight() : 0;
                } else {
                    startSticky = ($this.data('stickyStart') !== undefined) ? $this.data('stickyStart') : 0;
                }

                $(window).on('scroll', function (e) {
                    let scrollTop = $(this).scrollTop();

                    if (scrollTop > (headerBottom + startSticky)) {
                        $this.addClass('is-sticky');

                        if ($this.is('.is-sticky--off')) {
                            $this.removeClass('is-sticky--off');
                        }
                    } else {
                        if ($this.is('.is-sticky') && scrollTop === 0) {
                            $this.removeClass('is-sticky')
                                 .addClass('is-sticky--off');
                        }
                    }

                });
            });
        }
    };

    $(function () {
        APP.Sticky.init();
    });
})(jQuery);