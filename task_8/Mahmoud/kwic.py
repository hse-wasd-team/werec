outputTextFile = 'output.txt'

def input(line):
    if (not line or not isinstance(line, str)):
        return []
    return line.strip().split(' ')

def shift(inputList):
    if (not inputList or not isinstance(inputList, list)):
        return []

    tmpList = inputList[:]
    firstWord = inputList[0]
    tmpListLength = len(tmpList)
    i = 0

    for i in range(tmpListLength - 1):
        tmpList[i] = tmpList[i+1]
        i = i+1
    
    tmpList[tmpListLength-1] = firstWord

    return tmpList

def circularShift(inputList):
    if (not inputList or not isinstance(inputList, list)):
        return []

    tmpList = inputList[:]
    tmpListLength = len(tmpList)
    cycledLines = [None for j in range(tmpListLength)] 
    i = 0

    for i in range(tmpListLength):
        tmpList = shift(tmpList)
        cycledLines[i] = tmpList
        i = i+1

    return cycledLines

def alphabetizedSort(inputList):
    if (not inputList or not isinstance(inputList, list)):
        return []

    tmpList = inputList[:]
    tmpListLength = len(tmpList)

    tmpList.sort(key=lambda el: el[0].lower())

    return tmpList


def output(inputList):
    inputListLength = len(inputList)
    i = 0
    with open(outputTextFile, 'a') as outputFile:

        for currentLine in inputList:
            i = i+1
            outputFile.write("{}- ".format(i) + " ".join(currentLine) + "\n")
        outputFile.write("----------------------------------------------------\n")
        outputFile.close()

def performKWIC(filePath):
    open(outputTextFile, 'w').close()
    with open(filePath) as inputFile:
        lines = inputFile.read().splitlines()
        outputText = []
        for line in lines:
            output(alphabetizedSort(circularShift(input(line))))

inputTextFile = "input.txt"
performKWIC(inputTextFile)
    
