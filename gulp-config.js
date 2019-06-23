const env = require('./gulp-env')();

module.exports = () => {
    const config = {
        html: {
            source: `${env.srcPath}/**/*.{html,htm,php,cshtml}`,
            lintPath: `${env.srcPath}/`,
            build: `${env.buildPath}/`
        },
        styles: {
            source: `${env.srcPath}/styles/**/*.{scss,sass,css}`,
            lintPath: `${env.srcPath}/styles/`,
            build: `${env.buildPath}/styles/`
        },
        images: {
            source: `${env.srcPath}/images/**/*.{jpg,JPG,jpeg,JPEG,png,PNG,gif,GIF,svg}`,
            build: `${env.buildPath}/images/`
        },
        browserSync: {
            port: env.port,
            ghostMode: {
                clicks: true,
                location: true,
                forms: true,
                scroll: true
            },
            injectChanges: true,
            notify: true,
            reloadDelay: 0
        },
        options: {
            autoPrefixerOptions: ['last 4 versions', '> 9%'],
            sass: {
                outputStyle: 'compressed'
            },
            formatting: {
                'indent_size': 4,
                'indent_char': ' ',
                'indent_with_tabs': false,
                'preserve_newlines': true,
                'max_preserve_newlines': 5,
                'space_after_anon_function': true,
                'brace_style': 'collapse',
                'break_chained_methods': false,
                'keep_array_indentation': true,
                'end_with_newline': true,
                'operator_position': 'before-newline',
                'indent_inner_html': false,
                'indent_scripts': 'normal',
                'wrap_line_length': 0,
                css: {
                    'selector_separator_newline': false
                }
            },
            lint: {
                sass: {
                    options: {
                        'formatter': 'stylish',
                        'merge-default-rules': true
                    },
                    rules: {
                        'important': 0,
                        'indentation': [1, {
                            size: 4
                        }],
                        'nesting-depth': [1, {
                            'max-depth': 4
                        }], // this would be something i want to flag, i like three deep
                        'no-transition-all': 0,
                        'no-color-literals': 0,
                        'final-newline': 0,
                        'class-name-format': [1, {
                            convention: 'hyphenatedbem'
                        }],
                        'no-duplicate-properties': [1, {
                            exclude: ['display', 'font-size', 'line-height', 'text-decoration']
                        }],
                        'mixins-before-declarations': 0,
                        'empty-line-between-blocks': 0,
                        'property-sort-order': 0,
                        'space-around-operator': 0,
                        'pseudo-element': 0,
                        'no-url-domains': 0,
                        'no-url-protocols': 0,
                        'quotes': 0,
                        'leading-zero': [1, {
                            include: true
                        }],
                        'single-line-per-selector': 0,
                        'force-pseudo-nesting': 0
                    }
                }
            }
        }
    }

    return config;
};