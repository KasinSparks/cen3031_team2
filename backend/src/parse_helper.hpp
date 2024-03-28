#ifndef PARSE_HELPER_HPP
#define PARSE_HELPER_HPP

// Not the most robust parser; may not report all errors
// NOTE: Use with caution.
static void parse_req_cols(const std::string &in, std::vector<std::string> &result) {
    // Check for empty string
    if (in.length() == 0) {
        throw std::runtime_error("Tried to parse an empty string.");
    }

    // First char shall be a [
    if (in[0] != '[') {
        throw std::runtime_error("Missing opening [.");
    }

    // Go until comma or closing bracket ]
    size_t i = 1;
    size_t last_pos = 1;
    while (true) {
        if (i >= in.length()) {
            throw std::runtime_error("Did not find closing bracket ].");
        }

        // TODO: Handle whitespace and other escape characters

        if (in[i] == ',') {
            if (i == last_pos + 1) {
                throw std::runtime_error("Empty field?");
            }

            // Store and continue
            result.push_back(in.substr(last_pos, (i - last_pos)));
            last_pos = i;
        } else if (in[i] == ']') {
            if (i == last_pos + 1) {
                throw std::runtime_error("Empty field?");
            }

            // Store and end
            result.push_back(in.substr(last_pos, (i - last_pos)));
            break;
        }

        i++;
    }
}

// Not the most robust parser; may not report all errors
// NOTE: Use with caution.
static void parse_post_body_params(const std::string &body, std::map<std::string, std::string> &output)
{
    // Check for empty string
    if (body.length() == 0) {
        throw std::runtime_error("Tried to parse an empty string.");
    }

    std::vector<std::string> fields;

    size_t i = 0;
    size_t last_pos = i;
    while (i < body.length()) {
        if (body[i] == '&') {
            fields.push_back(body.substr(last_pos, i - last_pos)); 
            last_pos = i + 1;
        }
         
        i++;
    }

    // grab the last field if needed
    if (last_pos != i) {
        fields.push_back(body.substr(last_pos, i - last_pos)); 
    }

    // Parse the fields
    for (std::string f : fields) {
        // Go until the first equal sign
        size_t j = 0;
        while (true) {
            if (f[j] == '=') {
                std::string temp = f.substr(0, j);
                output[temp] = f.substr(j + 1, f.length() - j - 1);
                break;
            }

            j++;
        }
    }
}


#endif
