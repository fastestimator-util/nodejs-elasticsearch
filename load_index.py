import os
import requests
import argparse


def load_index(dir, index_version):
    print ("Loading " + index_version + " data from: " + dir)
    headers = {'Content-Type': 'application/json'}

    for root, dirs, files in os.walk(dir):
        for name in files:
            print(os.path.join(root, name))
            json = open(os.path.join(root, name), 'r')
            payload = json.read()

            print (payload)
            print ("http://localhost:9200/fe"  + index_version + "/_doc/" + os.path.splitext(name)[0])

            r = requests.post("http://localhost:9200/fe" + index_version + "/_doc/" + name, data=payload, headers=headers)

if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="FE ES loader script")
    parser.add_argument("directory", type=str)
    parser.add_argument("index_version", type=str)

    args = parser.parse_args()

    load_index(args.directory, args.index_version)