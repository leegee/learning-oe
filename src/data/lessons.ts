// src/data/lessons.ts
import { Lesson } from '../types/lessons';

export const lessons: Lesson[] = [
    {
        title: "1: Greetings",
        cards: [
            {
                class: 'blanks',
                question: "Se ___ drincð ___",
                words: [
                    { word: 'drincks', correct: false },
                    { word: 'cyning', correct: true },
                    { word: 'wæter', correct: true },
                    { word: 'heafod', correct: false },
                    { word: 'hlaf', correct: false },]
            },
            {
                class: 'vocab',
                question: "Match the words",
                vocab: [
                    { "Hello": "Hāl" },
                    { "Good morning": "Gōdmorgen" },
                    { "Good evening": "Gōd æfen" },
                    { "Good night": "Gōd niht" },
                    { "How are you?": "Hwæt ēart þū?" }
                ]
            },
            {
                class: 'multiple-choice',
                question: "Hello, how are you?",
                answers: ["Hālhwætsīeēow", "Godmorgen", "Gōdmorgen"],
                answer: "Hālhwætsīeēow",
            },
            {
                class: 'multiple-choice', question: "Good morning!",
                answers: ["Hālhwætsīeēow", "Godmorgen", "Gōdmorgen"],
                answer: "Gōdmorgen",
            },
            {
                class: 'multiple-choice', question: "Good evening!",
                answers: ["Gōd æfen", "Gōd niht", "Gōdmorgen"],
                answer: "Gōd æfen",
            },
            {
                class: 'multiple-choice', question: "How are you today?",
                answers: ["Hū gǣþ þīn dæg?", "Hū gǣþ þīn tōdæg?", "Hū gǣþ þīn"],
                answer: "Hū gǣþ þīn dæg?",
            },
            {
                class: 'multiple-choice', question: "I’m fine, thank you.",
                answers: ["Ic eom gesund, þancie þē", "Ic eom god, þancie þē", "Ic eom hæl, þancie þē"],
                answer: "Ic eom god, þancie þē",
            },
            {
                class: 'multiple-choice', question: "What’s your name?",
                answers: ["Hwæt is þīn nama?", "Hū hatst þū?", "Hwæt is þīn nama, ealdor?"],
                answer: "Hwæt is þīn nama?",
            },
            {
                class: 'multiple-choice', question: "My name is John.",
                answers: ["Ic eom John", "Min nama is John", "Min nama is Iohannes"],
                answer: "Ic eom John",
            },
            {
                class: 'multiple-choice', question: "Where are you from?",
                answers: ["Hwaer cōmest þū?", "Hwaer cymst þū?", "Hwaer eart þū fram?"],
                answer: "Hwaer cōmest þū?",
            },
            {
                class: 'multiple-choice', question: "I am from England.",
                answers: ["Ic com of Englalond", "Ic eom of Englalond", "Ic eom fram Englaland"],
                answer: "Ic com of Englalond",
            },
            {
                class: 'multiple-choice', question: "10. Goodbye!",
                answers: ["Gōdbye", "Wes þú hāl", "Far þú well"],
                answer: "Wes þú hāl",
            },
        ],
    },
    {
        title: "2: Introducing Yourself",
        cards: [
            {
                class: 'multiple-choice', question: "My name is John.",
                answers: ["Ic eom John", "Min nama is John", "Min nama is Iohannes"],
                answer: "Ic eom John",
            },
            {
                class: 'multiple-choice', question: "I am from England.",
                answers: ["Ic com of Englalond", "Ic eom of Englalond", "Ic eom fram Englaland"],
                answer: "Ic com of Englalond",
            },
            {
                class: 'multiple-choice', question: "What is your occupation?",
                answers: ["Hū wyrce þū?", "Hū eart þū on weorc?", "Hwæt eart þū?"],
                answer: "Hū wyrce þū?",
            },
            {
                class: 'multiple-choice', question: "I am a teacher.",
                answers: ["Ic eom lārēow", "Ic eom þegn", "Ic eom rædend"],
                answer: "Ic eom lārēow",
            },
            {
                class: 'multiple-choice', question: "What languages do you speak?",
                answers: ["Hwilc spræce sprece þū?", "Hwilc tunge spræce þū?", "Hwilc lagu sprece þū?"],
                answer: "Hwilc spræce sprece þū?",
            },
            {
                class: 'multiple-choice', question: "I speak English and Old English.",
                answers: ["Ic spræc Englisc and Eald Englisc", "Ic sprece Englisc and Eald Englisc", "Ic cwaed Englisc and Eald Englisc"],
                answer: "Ic spræc Englisc and Eald Englisc",
            },
            {
                class: 'multiple-choice', question: "How old are you?",
                answers: ["Hū eald eart þū?", "Hū yldra eart þū?", "Hū wæst þū?"],
                answer: "Hū eald eart þū?",
            },
            {
                class: 'multiple-choice', question: "I am twenty-five years old.",
                answers: ["Ic eom twēntig fīf geara eald", "Ic eom twentig fīf geara eald", "Ic eom twēntig fīf gear"],
                answer: "Ic eom twēntig fīf geara eald",
            },
            {
                class: 'multiple-choice', question: "Where do you live?",
                answers: ["Hwaer lyft þū?", "Hwaer þū bēst?", "Hwaer hæfst þū hām?"],
                answer: "Hwaer lyft þū?",
            },
            {
                class: 'multiple-choice', question: "10. I live in London.",
                answers: ["Ic lyfe in Lundon", "Ic hæfde Lundeceastre", "Ic bēo in Lundon"],
                answer: "Ic lyfe in Lundon",
            },
        ],
    },
    {
        title: "3: Everyday Phrases",
        cards: [
            {
                class: 'multiple-choice', question: "Please pass me the salt.",
                answers: ["Wille þū gēaf mē þone sealt?", "Gēaf mē sealt, pls", "Geoff mē sealt"],
                answer: "Wille þū gēaf mē þone sealt?",
            },
            {
                class: 'multiple-choice', question: "Thank you very much.",
                answers: ["Þancie þē swīðe", "Ic þancie þē", "Eall þancie þē"],
                answer: "Þancie þē swīðe",
            },
            {
                class: 'multiple-choice', question: "Can I help you?",
                answers: ["Mæg ic þē helpon?", "Hast þū hēlp?", "Can ic bēo þē"],
                answer: "Mæg ic þē helpon?",
            },
            {
                class: 'multiple-choice', question: "I need to go to the store.",
                answers: ["Ic behōf þæt ic gā tō þǣm stōre", "Ic gā tō þǣm stōre", "Ic willa tōstōre"],
                answer: "Ic behōf þæt ic gā tō þǣm stōre",
            },
            {
                class: 'multiple-choice', question: "Where is the nearest bank?",
                answers: ["Hwaer is þæt neārest banc?", "Wēron hier is þe nearest bank?", "Hwilc banc is þæt?"],
                answer: "Hwaer is þæt neārest banc?",
            },
            {
                class: 'multiple-choice', question: "How much does it cost?",
                answers: ["Hū micel costað hit?", "Hū lōng does it cost?", "Hū mǣnig costaþ?"],
                answer: "Hū micel costað hit?",
            },
            {
                class: 'multiple-choice', question: "What time is it?",
                answers: ["Hwæt tīma is hit?", "Hwæt tīma lyfþ?", "Hū timan hit is?"],
                answer: "Hwæt tīma is hit?",
            },
            {
                class: 'multiple-choice', question: "I would like a coffee.",
                answers: ["Ic wīllæc cōfīe", "Ic wullīc cōfe", "Ic wole cōffee"],
                answer: "Ic wīllæc cōfīe",
            },
            {
                class: 'multiple-choice', question: "It’s very hot today.",
                answers: ["Hit is swīðe hāt tōdæg", "Ic eom hot", "Hit is swīðe cōl"],
                answer: "Hit is swīðe hāt tōdæg",
            },
            {
                class: 'multiple-choice', question: "10. I’ll see you later.",
                answers: ["Ic seō þē hēr", "Ic wāt þē dōn", "Ic geseo þē eft"],
                answer: "Ic geseo þē eft",
            },
        ],
    },
    {
        title: "4: Family and Relationships",
        cards: [
            {
                class: 'multiple-choice', question: "This is my mother.",
                answers: ["Þis is mín mōdor", "Ðis is mín mōdor", "Ic hālde min mōdor"],
                answer: "Þis is mín mōdor",
            },
            {
                class: 'multiple-choice', question: "This is my father.",
                answers: ["Þis is mín fāder", "Ðis is mín fāder", "Ic hālde min fāder"],
                answer: "Þis is mín fāder",
            },
            {
                class: 'multiple-choice', question: "I have two siblings.",
                answers: ["Ic hæbbe twēon", "Ic hæbbe twēo broþra", "Ic hæbbe twa sibbe"],
                answer: "Ic hæbbe twēo broþra",
            },
            {
                class: 'multiple-choice', question: "My sister is very kind.",
                answers: ["Mīn sweoster is swīðe cīgend", "Mīn sweostor is god", "Mīn sweoster is cōm"],
                answer: "Mīn sweoster is swīðe cīgend",
            },
            {
                class: 'multiple-choice', question: "I have one brother.",
                answers: ["Ic hæbbe ān broþor", "Ic hæbbe ān frēond", "Ic hæbbe ān broþor mid mē"],
                answer: "Ic hæbbe ān broþor",
            },
            {
                class: 'multiple-choice', question: "Where is your family from?",
                answers: ["Hwaer is þīn cyn?", "Hwaer is þīn hām?", "Hwaer is þīn family?"],
                answer: "Hwaer is þīn cyn?",
            },
            {
                class: 'multiple-choice', question: "I have a large family.",
                answers: ["Ic hæbbe mǣre cyn", "Ic hæbbe micel hām", "Ic hæbbe frēond tōceosan"],
                answer: "Ic hæbbe mǣre cyn",
            },
            {
                class: 'multiple-choice', question: "I’m married.",
                answers: ["Ic eom gehāten", "Ic eom gebunden", "Ic eom wedded"],
                answer: "Ic eom gehāten",
            },
            {
                class: 'multiple-choice', question: "My children are at school.",
                answers: ["Mīn cildra bēo on scole", "Mīn cildra bēo mid þē", "Mīn cildra bēo from school"],
                answer: "Mīn cildra bēo on scole",
            },
            {
                class: 'multiple-choice', question: "10. I’m single.",
                answers: ["Ic eom singel", "Ic eom in læf", "Ic eom bīdan"],
                answer: "Ic eom singel",
            },
        ],
    },
];
