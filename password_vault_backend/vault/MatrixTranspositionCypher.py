class MatrixTranspositionCypher:
    def __init__(self):
        pass

    def encrypt(self, plainText, key):
        """
            This method will encrypt the salt added to the password of the users
            so that it can be used successfully to validate the user in the next login
            attempt

            @author: Shalin Awadiya <shalin.awadiya@dal.ca>

        """
        max = 0
        for i in key:
            if (i > max):
                max = i

        column_length = max

        remainder = 0

        if (len(plainText) % column_length > 0):
            remainder = column_length - (len(plainText) % column_length)


        if remainder > 0:
            for i in range(remainder):
                plainText = plainText + "%"
        # print(plainText)
        rows = (int)(len(plainText) / column_length)
        # print(rows)

        eachrow = []
        startpoint = 0
        endpoint = column_length

        for i in range(rows):
            eachrow.append(plainText[startpoint:endpoint])
            startpoint = startpoint + column_length
            endpoint = endpoint + column_length
        # print(eachrow)
        cypherText = ""
        for i in range(len(key)):
            for j in range(len(eachrow)):
                cypherText = cypherText + eachrow[j][key[i] - 1]

        return cypherText, remainder

    def decrypt(self, cypherText, key):
        """
        After retrieving the encrypted password from the database it will be trimmed of
        salt and shown back to the users for further reference.

        @author: Shalin Awadiya <shalin.awadiya@dal.ca>

        """
        max = 0
        for i in key:
            if (i > max):
                max = i

        column_length = max
        rows = (int)(len(cypherText) / column_length)

        resultant_dictionary = {}
        startpoint = 0
        endpoint = rows
        for i in range(column_length):
            resultant_dictionary[key[i]] = cypherText[startpoint:endpoint]
            startpoint = startpoint + rows
            endpoint = endpoint + rows


        plainText = ""
        list2 = key
        list2.sort()
        for i in range(rows):
            for j in range(len(list2)):
                plainText = plainText + (resultant_dictionary.get(list2[j]))[i]

        return plainText
