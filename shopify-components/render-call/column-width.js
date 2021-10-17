export default function(value) {
    switch(value) {
        case 1:
          return "one-whole";
        case 2:
          return "one-half";
        case 3:
          return "one-third";
        case 4:
          return "one-fourth";
        case 5:
          return "one-fifth";
        case 6:
          return "one-sixth";
        case 7:
          return "one-seventh";
        case 8:
          return "one-eighth";
        default:
          return value;
    }
}