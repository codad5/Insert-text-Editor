export type EditorSettings = {
    editor_class ?: String, 
    form_name?: String
}


export type action_buttons<Type> = {
    bold: Type
    italic: Type
    underline: Type,
    paragraph: Type,

}

export type element_tagName  = "bold" | "italic" | "underline" | "paragraph"