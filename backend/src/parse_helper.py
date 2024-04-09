def parse_simple_csv(input, result):
    # Check for empty string
    if len(input) == 0:
        raise RuntimeError("Tried to parse an empty string.")

    i = 0
    last_pos = i
    while i < len(input):
        if input[i] == ',':
            result.append(input.substr(last_pos, i - last_pos))
            last_pos = i + 1
        i+=1

    if  last_pos < len(input) and i != last_pos:
        result.append(input.substr(last_pos, i - last_pos))

def parse_req_cols(input, result):
    # Check for empty string
    if len(input) == 0:
        raise RuntimeError("Tried to parse an empty string.")

    if input[0] != '[':
        raise RuntimeError("Missing opening [.")

    i = 0
    last_pos = i
    while True:
        if i >= len(input):
            raise RuntimeError("Missing opening ].")

        # TODO: Handle whitespace and other escape characters

        if input[i] == ',':
            if i == last_pos + 1:
                raise RuntimeError("Empty field?")
            result.append(input.substr(last_pos, i - last_pos))
            last_pos = i
        elif input[i] == ']':
            if i == last_pos + 1:
                raise RuntimeError("Empty field?")
            result.append(input.substr(last_pos, i - last_pos))
            break
        i+=1


def parse_post_body_params(body, output):
    # Check for empty string
    if len(body) == 0:
        raise RuntimeError("Tried to parse an empty string.")
    fields = []
    i = 0
    last_pos = i
    while i < len(body):
        if body[i] == '&':
            fields.append(body.substr(last_pos, i - last_pos))
            last_pos = i + 1
        i+=1

    # grab last field if needed
    if last_pos != i:
        fields.append(body.substr(last_pos, i - last_pos))

    for field in fields:
        j = 0
        while True:
            if field[j] == '=':
                temp = field.substr(0, j)
                output[temp] = field.substr(j + 1, len(field) - j - 1)
                break
            j+=1
