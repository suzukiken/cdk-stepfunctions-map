'''
{
  "todos": {
    ""
  }
}
'''


def lambda_handler(event, context):
    print(event)
    print(context)
    print('date {}'.format(event['date']))
