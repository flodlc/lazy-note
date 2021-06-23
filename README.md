# Lazy Notes

Micro SaaS offline that allows to write notes and store them safely.

## Technos

-   React
-   Normalize.css (No other UI lib to keep it light)
-   Emotion (styled components like)
-   Slate & Slate Pugins
-   Prettier for the code formatting

## Custom feature

The notes stored in the local storage are encrypted with AES algorithme and the given password.

## Possible improvements

-   #### Technical

    -   I could use the IndexedDb instead of the localStorage to solve performance issues with a massive amount of items.
        Thanks to the notesService it's easy to switch.

    -   The architecture choices are design for a small projects. Of course it has to be adapted while the project grows.

-   #### Tests
    -   Add tests on the pure components
    -   Add tests on the hooks
    -   Add tests on the utils functions (pure)
