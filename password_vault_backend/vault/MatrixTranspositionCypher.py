class MatrixTranspositionCypher:
    def encrypt(self, plain_text, key):
        """
        This method will encrypt the salt added to the password of the users
        so that it can be used successfully to validate the user in the next login
        attempt

        @author: Shalin Awadiya <shalin.awadiya@dal.ca>
        """

        max_l = 0

        for i in key:
            if i > max_l:
                max_l = i

        column_length = max_l

        remainder = 0

        if len(plain_text) % column_length > 0:
            remainder = column_length - (len(plain_text) % column_length)

        if remainder > 0:
            for i in range(remainder):
                plain_text = plain_text + "%"
        # print(plainText)
        rows = int(len(plain_text) / column_length)
        # print(rows)

        eachrow = []
        startpoint = 0
        endpoint = column_length

        for i in range(rows):
            eachrow.append(plain_text[startpoint:endpoint])
            startpoint = startpoint + column_length
            endpoint = endpoint + column_length

        cypher_text = ""
        for i in range(len(key)):
            for j in range(len(eachrow)):
                cypher_text = cypher_text + eachrow[j][key[i] - 1]

        return cypher_text, remainder

    def decrypt(self, cypher_text, key):
        """
        After retrieving the encrypted password from the database it will be trimmed of
        salt and shown back to the users for further reference.

        @author: Shalin Awadiya <shalin.awadiya@dal.ca>

        """
        max_l = 0

        for i in key:
            if i > max_l:
                max_l = i

        column_length = max_l
        rows = int(len(cypher_text) / column_length)

        resultant_dictionary = {}
        startpoint = 0
        endpoint = rows
        for i in range(column_length):
            resultant_dictionary[key[i]] = cypher_text[startpoint:endpoint]
            startpoint = startpoint + rows
            endpoint = endpoint + rows

        plain_text = ""
        list2 = key
        list2.sort()

        for i in range(rows):
            for j in range(len(list2)):
                plain_text = plain_text + (resultant_dictionary.get(list2[j]))[i]

        return plain_text
