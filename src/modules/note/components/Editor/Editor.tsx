import {
    createExitBreakPlugin,
    createHeadingPlugin,
    createHistoryPlugin,
    createNormalizeTypesPlugin,
    createParagraphPlugin,
    createReactPlugin,
    createSlatePluginsComponents,
    createSlatePluginsOptions,
    ELEMENT_H1,
    ELEMENT_PARAGRAPH,
    KEYS_HEADING,
    SlatePlugins,
    StyledElement,
    useSlatePluginsActions,
    withPlaceholders,
    withProps,
} from '@udecode/slate-plugins';
import { FunctionComponent, useEffect } from 'react';

const defaultEditorValue = [
    { type: 'h1', children: [{ text: '' }] },
    { type: 'p', children: [{ text: '' }] },
];

const pluginsBasic = [
    createReactPlugin(),
    createHistoryPlugin(),
    createParagraphPlugin(),
    createHeadingPlugin(),
    createExitBreakPlugin({
        rules: [
            {
                hotkey: 'enter',
                query: {
                    start: true,
                    end: true,
                    allow: KEYS_HEADING,
                },
            },
        ],
    }),
    createNormalizeTypesPlugin({
        rules: [{ path: [0], strictType: ELEMENT_H1 }],
    }),
];

const withStyledPlaceHolders = (components: any) =>
    withPlaceholders(components, [
        {
            key: ELEMENT_H1,
            placeholder: 'Titre de ma note...',
            hideOnBlur: false,
        },
    ]);

const components = withStyledPlaceHolders({
    ...createSlatePluginsComponents(),
    [ELEMENT_H1]: withProps(StyledElement, {
        as: 'h1',
        styles: {
            root: {
                margin: '0 0 24px',
                fontSize: '1.875em',
                fontWeight: '300',
                lineHeight: '1.3',
            },
        },
    }),
    [ELEMENT_PARAGRAPH]: withProps(StyledElement, {
        as: 'p',
        styles: {
            root: {
                fontWeight: '400',
                lineHeight: '1.3',
            },
        },
    }),
});

const options = createSlatePluginsOptions();

const Editor: FunctionComponent<{
    onChange?: (value: any[]) => void;
    value?: any[];
}> = ({ onChange = () => {}, value = defaultEditorValue }) => {
    const pluginsActions = useSlatePluginsActions();

    useEffect(() => {
        pluginsActions.setValue(value);
    }, [value, pluginsActions]);

    return (
        <SlatePlugins
            initialValue={value}
            components={components}
            options={options}
            plugins={pluginsBasic}
            onChange={(newValue) => onChange(newValue)}
        />
    );
};

export default Editor;
