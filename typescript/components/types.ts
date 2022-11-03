export type EditorSettings = {
    editor_class ?: String, 
    form_name?: String
}


export type action_buttons<Type> = {
    refresh: Type|null
    bold: Type
    italic: Type
    underline: Type,
    paragraph: Type,
    destroy:Type

}

export type element_tagName  = "bold" | "italic" | "underline" | "paragraph"